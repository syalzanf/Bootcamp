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