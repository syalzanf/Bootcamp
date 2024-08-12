const validator = require('validator');
const readline = require("readline");
const fs = require('fs');
const conn = require('./connection');
const { query } = require('express');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// async function runQuery(query, values = []) {
//     try {
//       const result = await conn.query(query, values);
//       return result.rows; // Return only the rows
//     } catch (error) {
//       throw error; // Throw error to be handled by caller
//     }
//   }

// async function loadContact(){
//     try{
//         const query = 'SELECT * FROM contacts';

//         const result = await runQuery(query);
//         return result;
//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
// }
  
async function loadContact() {
    const query = 'SELECT name, hp, email, updated_at FROM contacts ORDER BY updated_at DESC';
    try {
      const { rows } = await conn.query(query);
      return rows; // This will be an array of contacts
    } catch (err) {
      console.error('Error loading contacts:', err);
      return [];
    }
  }  

async function findContactByName(name) {
    const query = 'SELECT * FROM contacts WHERE name = $1';
    const values = [name];

    try {
      const result = await conn.query(query, values);
      return result.rows[0];
    } catch (err) {
        console.error('Error:', err);
      throw error; 
    }
}

// async function findContactByName(name) {
//     const query = 'SELECT * FROM contacts WHERE name = ?';
//     const values = [name];

//     const result = await runQuery(query, values);
//     return result[0];
// }


async function isContactAlreadyExists(newContact) {
    const query = 'SELECT * FROM contacts WHERE name = $1 OR hp = $2 OR email = $3';
    const values = [newContact.name, newContact.hp, newContact.email];
    try{
        const result = await conn.query(query, values);
        return result.length > 0;
    }catch (err){
        console.error('Error checking if contact already exists:', err);
        throw err;
    }
}

async function saveContact(name, hp, email) {

    const updatedAt = new Date().toISOString();
    const query = 'INSERT INTO contacts (name, hp, email, updated_at) VALUES ($1, $2, $3, $4)';
    const values = [name, hp, email, updatedAt];

    try {
        
        if (!validator.isMobilePhone(hp, 'id-ID')) {
            console.log('Nomor telepon tidak valid.');
            return;
        }

        if (!validator.isEmail(email)) {
            console.log('Email tidak valid.');
            return;
        }

        // Cek email memiliki domain ".com"
        const emailParts = email.split('@');
        const domain = emailParts[1].toLowerCase();
        if (!domain.endsWith('.com')) {
            console.log('Ekstensi domain email harus .com');
            return;
        }

        // Cek jika kontak sudah ada
        const existingContact = await findContactByName(name);
        if (existingContact) {
            console.log('Kontak sudah ada dalam daftar.');
            return;
        }
        // Cek jika nomor telepon atau email sudah ada
        if (await isContactAlreadyExists({ hp, email })) {
            console.log('Nomor telepon atau email sudah ada dalam daftar.');
            return;
        }

        // Ambil data kontak yang ada
        const contacts = await loadContact();

        // Tambahkan kontak baru
        contacts.push({ name, hp, email });

         // Jalankan query SQL untuk menyimpan data ke dalam database
         await conn.query(query, values);

        console.log('Kontak berhasil ditambahkan.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        rl.close();
    }
}

async function updateContact(name, updatedContact) {
        try {

            const existingContact = await findContactByName(name);
            if (!existingContact) {
                console.log('Kontak tidak ditemukan.');
                return false;
            }
            if (!validator.isMobilePhone(updatedContact.hp, 'id-ID')) {
                console.log('Nomor telepon tidak valid.');
                return;
            }
            if (!validator.isEmail(updatedContact.email)) {
                console.log('Email tidak valid.');
                return;
            }
            // Cek email memiliki domain ".com"
            const emailParts = updatedContact.email.split('@');
            const domain = emailParts[1].toLowerCase();
            if (!domain.endsWith('.com')) {
                console.log('Ekstensi domain email harus .com');
                return;
            }
            const updatedAt = new Date().toISOString(); // Menyimpan perubahan ke database
            
            const query = 'UPDATE contacts SET name = $1, hp = $2, email = $3, updated_at = $4 WHERE name = $1';
            const values = [name, updatedContact.hp, updatedContact.email, updatedAt];
            await conn.query(query, values);

            console.log(`Data kontak ${name} berhasil diperbarui.`);
            return true;

        } catch (err) {
            console.error('Error updating contact:', err);
        } finally {
        rl.close();
    }
}

async function deleteContact(name) {
    try {
        // Periksa apakah kontak dengan nama yang ingin dihapus ada
        const existingContact = await findContactByName(name);
        if (!existingContact) {
            console.log('Kontak tidak ditemukan.');
            return;
        }
        const query = 'DELETE FROM contacts WHERE name = $1';
        const values = [name];
        await conn.query(query, values);
        console.log(`Kontak dengan nama ${name} berhasil dihapus.`);
    } catch (err) {
        console.error('Error:', err);
    }
}


async function listContacts() {
    try {
        const contacts = await loadContact();

        if (contacts.length === 0) {
            console.log('Daftar kontak kosong.');
        } else {
            console.log('Daftar Kontak:');
            contacts.forEach((contact, index) => {
                console.log(`${index + 1}. Nama: ${contact.name}`);
                console.log(`   Nomor Telepon: ${contact.hp}`);
            });
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        rl.close();
    }
}

async function detailContact(name) {
    try {
        const contacts = await loadContact(); // Memuat kontak dari file JSON
        const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()); // Mencari kontak berdasarkan nama

        if (!contact) {
            console.log(`Kontak dengan nama ${name} tidak ditemukan.`);
            return;
        }

        // Menampilkan detail kontak
        console.log(`Nama: ${contact.name}`);
        console.log(`Nomor Telepon: ${contact.hp}`);
        console.log(`Email: ${contact.email}`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        rl.close();
    }
}



module.exports = { 
    saveContact,
    deleteContact,
    updateContact,
    listContacts,
    detailContact,
    loadContact,
    findContactByName,
    isContactAlreadyExists };