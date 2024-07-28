// //file sistem
// const fs = require("fs");

// // //menuliskan string
// // fs.writeFileSync('test.txt', 'Hello World secara synchronous!');

// fs.readFile('test.txt','utf-8', (err,data) => {
//     if (err) throw err;
//     console.log(data);
// }); 


const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const validatePhoneNumber = (noPhone) => {
  return validator.isMobilePhone(noPhone, 'id-ID');
};


const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    return false;
  }
  const emailParts = email.split('@');
  const domain = emailParts[1].toLowerCase();
  if (!domain.endsWith('.com')) {
    console.log('Ekstensi domain email harus .com');
    return false;
  }
  return true;
};

const Name = () => {
  rl.question('What is your name? ', (name) => {
    PhoneNumber(name);
  });
};

const PhoneNumber = (name) => {
  rl.question('What is your phone number? ', (noPhone) => {
    if (!validatePhoneNumber(noPhone)) {
      console.log('Invalid phone number');
      PhoneNumber(name);
    } else {
      Email(name, noPhone);
    }
  });
};

const Email = (name, noPhone) => {
  rl.question('What is your email? ', (email) => {
    if (!validateEmail(email)) {
      console.log('Invalid email');
      Email(name, noPhone);
    } else {
      console.log(`Thank you ${name}`);
      console.log(`Your phone number is: ${noPhone}`);
      console.log(`Your email is: ${email}`);
      rl.close();
    }
  });
};

Name();