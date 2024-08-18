const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;
const morgan = require('morgan');
const path = require('path');
const validator = require('validator');
const session = require('express-session');
const flash = require('connect-flash');
const { loadContact, saveContact, findContactById, updateContact, deleteContact, isContactAlreadyExists } = require('./contact');
const pool = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'main-layout');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'sya1',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.get('/api/', (req, res) => {
  res.render('home', {
    nama: 'Syalza',
    title: 'home page'
  });
});

// Rute untuk menampilkan halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about page'
  });
});

// Rute untuk menampilkan 
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await loadContact();
    // console.log('Contacts fetched:', contacts); // Log data yang diambil
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute untuk halaman tambah kontak
app.get('/api/contact/add', (req, res) => {
  res.render('addContact', {
    title: 'Add New Contact',
    name: '',
    hp: '',
    email: ''
  });
});

app.post('/api/contact/add', async (req, res) => {
  const { name, hp, email } = req.body;
  console.log('Received data:', { name, hp, email });

  let errorMessage = '';

  if (!validator.isMobilePhone(hp, 'id-ID')) {
    errorMessage = 'Invalid phone number!';
    console.error('Validation error: Invalid phone number');
  }
  if (!validator.isEmail(email)) {
    errorMessage = 'Invalid email!';
    console.error('Validation error: Invalid email');
  } else if (!email.endsWith('.com')) {
    errorMessage = 'Invalid email!';
    console.error('Validation error: Email must end with .com');
  }

  if (!errorMessage) {
    const newContact = { name, hp, email };
    const contactExists = await isContactAlreadyExists(newContact);

    if (contactExists) {
      errorMessage = 'Contact already exists!';
      console.error('Validation error: Contact already exists');
    }
  }

  if (errorMessage) {
    return res.status(400).json({ errorMessage });
  }

  try {
    await saveContact(name, hp, email);
    console.log('Contact added successfully');

    res.status(200).json({ message: 'Contact added successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute untuk menampilkan detail kontak berdasarkan id
app.get('/api/contact/detail/:id', async (req, res) => {
  const contactId = parseInt(req.params.id, 10);
  try {
    const contact = await findContactById(contactId);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.render('detailContact', {
      contact: contact,
      title: `Detail Contact Page`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk menghapus kontak berdasarkan id
app.post('/api/contact/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10); // Mengambil id kontak dari permintaan POST
  await deleteContact(id); // Menghapus kontak dengan id yang diberikan
  console.log(`Menghapus kontak dengan id: ${id}`);
  res.json({ message: 'Contact successfully deleted' });
});

// Rute untuk menampilkan halaman edit kontak berdasarkan id
app.get('/api/contact/edit/:id', async (req, res) => {
  const contactId = parseInt(req.params.id, 10);
  try {
    const contact = await findContactById(contactId);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.render('editContact', {
      contact: contact,
      title: 'Edit Contact page',
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/api/contact/update/:id', async (req, res) => {
  const contactId = parseInt(req.params.id, 10);
  const { name, hp, email } = req.body;

  console.log('Received data:', req.body);
  console.log('Received ID:', req.params.id, 'Parsed ID:', contactId);

  const updatedData = { name, hp, email };

  // Validasi input
  let errorMessage = '';

  if (!validator.isMobilePhone(hp, 'id-ID')) {
    errorMessage = 'Invalid phone number!';
  } else if (!validator.isEmail(email)) {
    errorMessage = 'Invalid email address!';
  } else if (!email.endsWith('.com')) {
    errorMessage = 'Email must end with .com!';
  }

  if (errorMessage) {
    console.log('Validation error:', errorMessage);
    return res.status(400).json({ errorMessage });
  }

  // Jika tidak ada kesalahan, lakukan pembaruan kontak
  try {
    await updateContact(contactId, updatedData);
    res.status(200).json({ message: 'Contact updated successfully!' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(404).json({ error: 'Contact not found or update failed.' });
  }
});




app.get('/product/:id', (req, res) => {
  res.send(`product id : ${req.params.id} <br> category id : ${req.query.category}`);
});

// Menggunakan app.use untuk penanganan 404
app.use('/', (req, res) => {
  res.status(404).send('page not found :404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
