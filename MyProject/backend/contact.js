const validator = require('validator');
const readline = require("readline");
const pool = require('./connection');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function loadContact() {
    const query = 'SELECT id, name, hp, email, updated_at FROM contacts ORDER BY updated_at DESC';
    try {
        const { rows } = await pool.query(query);
        // console.log('Contacts from database:', rows);
        return rows;
    } catch (err) {
        console.error('Error loading contacts:', err);
        return [];
    }
}

async function findContactById(id) {
    const query = 'SELECT * FROM contacts WHERE id = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error:', err);
        throw err; 
    }
}

async function isContactAlreadyExists(newContact) {
    const query = 'SELECT * FROM contacts WHERE name = $1 OR hp = $2 OR email = $3';
    const values = [newContact.name, newContact.hp, newContact.email];
    try {
        const result = await pool.query(query, values);
        return result.rows.length > 0;
    } catch (err) {
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

        const emailParts = email.split('@');
        const domain = emailParts[1].toLowerCase();
        if (!domain.endsWith('.com')) {
            console.log('Ekstensi domain email harus .com');
            return;
        }

        if (await isContactAlreadyExists({ name, hp, email })) {
            console.log('Nama, Nomor telepon, atau email sudah ada dalam daftar.');
            return;
        }

        await pool.query(query, values);

        console.log('Kontak berhasil ditambahkan.');
    } catch (err) {
        console.error('Error:', err);
    }
}

async function updateContact(id, updatedContact) {
    console.log('Received ID:', id);
    console.log('Received updated contact:', updatedContact);

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
        console.log('Invalid contact ID');
        return false;
    }

    try {
        const existingContact = await findContactById(contactId);
        if (!existingContact) {
            console.log('Kontak tidak ditemukan.');
            return false;
        }

        if (!validator.isMobilePhone(updatedContact.hp, 'id-ID')) {
            console.log('Nomor telepon tidak valid.');
            return false;
        }

        if (!validator.isEmail(updatedContact.email)) {
            console.log('Email tidak valid.');
            return false;
        }

        const emailParts = updatedContact.email.split('@');
        const domain = emailParts[1].toLowerCase();
        if (!domain.endsWith('.com')) {
            console.log('Ekstensi domain email harus .com');
            return false;
        }

        const updatedAt = new Date().toISOString();
        const query = 'UPDATE contacts SET name = $1, hp = $2, email = $3, updated_at = $4 WHERE id = $5';
        const values = [updatedContact.name, updatedContact.hp, updatedContact.email, updatedAt, contactId];

        await pool.query(query, values);

        console.log(`Data kontak ${contactId} berhasil diperbarui.`);
        return true;
    } catch (err) {
        console.error('Error updating contact:', err);
        return false;
    }
}


async function deleteContact(id) {
    console.log('Menghapus kontak dengan id:', id); 

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
        console.log('Invalid contact ID');
        return false;
    }
    try {
        const existingContact = await findContactById(contactId);
        if (!existingContact) {
            console.log('Kontak tidak ditemukan.');
            return;
        }

        const query = 'DELETE FROM contacts WHERE id = $1';
        const values = [contactId];
        await pool.query(query, values);
        console.log(`Kontak dengan id ${contactId} berhasil dihapus.`);
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
    }
}

async function detailContact(id) {
    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
        console.log('Invalid contact ID');
        return false;
    }
    try {
        const contact = await findContactById(contactId);

        if (!contact) {
            console.log(`Kontak dengan id ${contactId} tidak ditemukan.`);
            return;
        }

        console.log(`Nama: ${contact.name}`);
        console.log(`Nomor Telepon: ${contact.hp}`);
        console.log(`Email: ${contact.email}`);
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = { 
    saveContact,
    deleteContact,
    updateContact,
    listContacts,
    detailContact,
    loadContact,
    findContactById,
    isContactAlreadyExists 
};