const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const figlet = require('figlet');

/*
 *Declearing server variables
 */


server.use(express.urlencoded({ extended: false }))
server.use(bodyParser.json());

//storing messages

const GMessages = [];

/**
 * Telling the user he/she/it using the server application
 */

console.log(chalk.yellow(figlet.textSync('Chatti', { horizontalLayout: 'full' })));
console.log(chalk.yellow(figlet.textSync('SERVER', { horizontalLayout: 'full', font: 'Big Money-ne' })));

server.post('/connected', (req, res) => {
    const { name } = req.body;
    console.log("[CLIENT] A client is connecting to the server! (name: " + name + ")");
    res.status(200);
});

server.get('/comments', (req, res) => {
    res.status(200)
    res.send({"messages":GMessages});
});

server.post('/sendMSG', (req, res) => {
    GMessages.push(req.body[0]);
    console.log(`[SERVER] A client has posted a comment! \n${chalk.red(`${req.body[0].author}: ${req.body[0].content}`)}`)
})

server.listen(process.argv[2]);