
const yargs = require("yargs");
const readline = require("readline");
const func = require('./contact')

yargs
  .command({
  command:'add',
  describe:'add new contact',
  builder:{
    name:{
      describe:'Contact name',
      demandOption: true,
      type:'string',
    },
    email:{
      describe:'Contact email',
      demandOption: true,
      type:'string',
    },
    hp:{
      describe:'Contact mobile phone number',
      demandOption: true,
      type:'string',
    },
  },

  handler(argv){
    func.saveContact(argv.name, argv.hp, argv.email)
    },
    })
    .command({
      command:'delete',
      describe:'delete a contact',
      builder:{
        name:{
          describe:'delete a contact name',
          demandOption: true,
          type:'string',
        },
      },
      handler(argv) {
        func.deleteContact(argv.name);
      },
    })
    .command({
      command:'update',
      describe:'update a contact',
      builder:{
        name:{
          describe:'update a contact name',
          demandOption: true,
          type:'string',
        },
      },
      handler(argv) {
        func.updateContact(argv.name, argv.hp, argv.email);
      },
    })
    .command({
      command: 'list',
      describe: 'list all contacts',
      handler() {
        func.listContacts();
      },
    })
    .command({
      command: 'detail',
      describe: 'Menampilkan detail kontak berdasarkan nama',
      builder: {
          name: {
              describe: 'Nama kontak',
              demandOption: true,
              type: 'string'
          }
      },
      handler(argv) {
        func.detailContact(argv.name);
      }
  })
  
  .parse();


// const readline = require('readline');
// const validator = require('validator');
// const fs = require ('fs');
// const { stringify } = require('querystring');

// const filePath = './data/contacts.json';


// // Memastikan direktori dan file ada secara sinkron
// if (!fs.existsSync('./data')) {
//   fs.mkdirSync('./data');
// }
// if (!fs.existsSync(filePath)) {
//   fs.writeFileSync(filePath, '[]', 'utf-8');
// }  

// // Membuat antarmuka readline untuk input dari pengguna
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Fungsi untuk memvalidasi nomor telepon
// const validatePhoneNumber = (noPhone) => {
//   return validator.isMobilePhone(noPhone, 'id-ID');
// };

// // Fungsi untuk memvalidasi email
// const validateEmail = (email) => {
//   if (!validator.isEmail(email)) {
//     return false;
//   }
//   const emailParts = email.split('@');
//   const domain = emailParts[1].toLowerCase();
//   if (!domain.endsWith('.com')) {
//     console.log('Ekstensi domain email harus .com');
//     return false;
//   }
//   return true;
// };

// // Fungsi untuk menanyakan pertanyaan dan mendapatkan jawaban secara asinkron
// const question = (str) => {
//   return new Promise((resolve) => rl.question(str, (answer) => resolve(answer)));
// };

// // Fungsi utama untuk menjalankan logika program
// const main = async () => {
//   // Meminta nama pengguna
//   const name = await question('What is your name? ');

//   // Meminta nomor telepon dan validasi input
//   let noPhone = await question('What is your phone number? ');
//   while (!validatePhoneNumber(noPhone)) {
//     console.log('Invalid phone number. Please enter a valid phone number.');
//     noPhone = await question('What is your phone number? ');
//   }

//   // Meminta email dan validasi input
//   let email = await question('What is your email? ');
//   while (!validateEmail(email)) {
//     console.log('Invalid email. Please enter a valid email.');
//     email = await question('What is your email? ');
//   }

//   // Membuat objek kontak dengan data yang valid
//   const contact = { name, noPhone, email };
//   console.log(contact);

//   // Membaca file contacts.json dan menambahkan kontak baru
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.log('Error reading file:', err);
//       rl.close();
//       return;
//     }

//     // Parsing data dari file dan menambahkan kontak baru
//     let contacts = JSON.parse(data);
//     contacts.push(contact);

//     // Menyimpan kembali data ke file
//     fs.writeFile(filePath, JSON.stringify(contacts), (err) => {
//       if (err) {
//         console.log('Error writing file:', err);
//       } else {
//         console.log(`Thank you ${name}`);
//         console.log(`Your phone number is: ${noPhone}`);
//         console.log(`Your email is: ${email}`);
//       }
//       rl.close();
//     });
//   });
// };

// // Menjalankan fungsi utama
// main();