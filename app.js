//file sistem
const fs = require("fs");

fs.readFile('test.txt','utf-8', (err,data) => {
    if (err) throw err;
    console.log(data);
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

rl.question('what is your name?', (name) =>{
    rl.question('What is your phone number? ', (noPhone) => {
        rl.question('What is your email? ', (email) => {
            console.log(`Thank you ${name}`);
            console.log(`Your phone number is: ${noPhone}`);
            console.log(`Your email is: ${email}`);

    rl.close()
});
});
});