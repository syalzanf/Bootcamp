const validator = require('validator');
const readline = require("readline");
const fs = require('fs');
const dataPath = './data/contacts.json';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

async function loadContact() {
    try {
        const data = await fs.promises.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error loading contacts:', err);
        return [];
    }
}
    
async function findContactByName(name) {
    const contacts = await loadContact();
    return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
}

async function isContactAlreadyExists(newContact) {
    const contacts = await loadContact();
    return contacts.some(contact => contact.name === newContact.name || contact.hp === newContact.hp || contact.email === newContact.email);
}

async function saveContact(name, hp, email) {

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

        // Simpan ke file JSON
        await fs.promises.writeFile(dataPath, JSON.stringify(contacts, null, 2), 'utf8');
        console.log('Kontak berhasil ditambahkan.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        rl.close();
    }
}

async function updateContact(name, newPhone, newEmail) {
    try {
        const contacts = await loadContact();
        const contactIndex = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

        if (contactIndex !== -1) {
            if (newPhone) {
                if (!validator.isMobilePhone(newPhone, 'id-ID')) {
                    console.log('Nomor telepon tidak valid.');
                    return;
                }
        
                contacts[contactIndex].hp = newPhone;
            }
            if (newEmail) {
                if (!validator.isEmail(newEmail)) {
                    console.log('Email tidak valid.');
                    return;
                }
                // Cek email memiliki domain ".com"
                const emailParts = newEmail.split('@');
                const domain = emailParts[1].toLowerCase();
                if (!domain.endsWith('.com')) {
                    console.log('Ekstensi domain email harus .com');
                    return;
                }

                contacts[contactIndex].email = newEmail;
            }
            // Menyimpan perubahan ke file JSON
            await fs.promises.writeFile(dataPath, JSON.stringify(contacts, null, 2), 'utf8');
            console.log(`Data kontak ${name} berhasil diperbarui.`);
        } else {
            console.log(`Kontak dengan nama ${name} tidak ditemukan.`);
        }
    } catch (err) {
        console.error('Error:', err);
     } finally {
        rl.close();
    }
}

async function deleteContact(name) {
    try {
        let contacts = await loadContact();
        const index = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

        if (index === -1) {
            console.log('Kontak tidak ditemukan.');
            return;
        }
        contacts = contacts.filter(contact => contact.name.toLowerCase() !== name.toLowerCase());
        // Simpan perubahan ke file JSON
        await fs.promises.writeFile(dataPath, JSON.stringify(contacts, null, 2), 'utf8');
        console.log(`Kontak dengan nama ${name} berhasil dihapus.`);
    } catch (err) {
        console.error('Error:', err);
      } finally {
        rl.close();
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