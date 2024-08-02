const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = 3000
const morgan = require('morgan')
const path = require('path'); 
const fs = require ('fs')
const validator = require('validator');
const session = require('express-session');
const flash = require('connect-flash');

const { loadContact, saveContact, findContactByName, updateContact, deleteContact,  isContactAlreadyExists} = require('./contact')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'main-layout');

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static('public'));

// Middleware untuk parsing JSON
app.use(express.json());
// Middleware untuk parsing URL-encoded data
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

// app.use((req, res, next) => {
//   console.log('Request Path:', req.path);
//   next();
// });

// app.get('/', (req, res)=>{
//   res.sendFile('./home.html',{root:__dirname});
// })

app.get('/', (req, res)=>{
  res.render('home', {
    nama: 'Syalza',
    title: 'home page'})
})

// Rute untuk menampilkan halaman about
app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'about page'})
})

// Rute untuk menampilkan kontak
app.get('/contact', async (req, res) => {
  const contact = await loadContact();
  res.render('contact', {
        title: 'Contact Page',
        contact: contact, 
        
  });
});

// Rute untuk halaman tambah kontak
app.get('/contact/add', async (req, res) => {
  const name = '';
  const hp = '';
  const email = '';

  res.render('addContact', {
    title: 'Add New Contact',
    name,
    hp,
    email
  });
});
app.post('/contact/add', async (req, res) => {
  const { name, hp, email } = req.body;
  console.log('Received data:', { name, hp, email });

  // Validasi input
  let errorMessage = '';

   if (!validator.isMobilePhone(hp, 'id-ID')) {
    errorMessage = 'Invalid phone number!';
  }
  if (!validator.isEmail(email)) {
    errorMessage = 'Invalid email!';
  } else if (!email.endsWith('.com')) {
    errorMessage = 'Invalid email!';
  }

  // Cek apakah kontak sudah ada
  if (!errorMessage) {
    const newContact = { name, hp, email };
    const contactExists = await isContactAlreadyExists(newContact);

    if (contactExists) {
      errorMessage = 'Contact already exists!';
    }
  }

  if (errorMessage) {
    return res.render('addContact', {
      title: 'Add Contact',
      errorMessage,
      name, // nilai input yang telah dimasukkan
      hp,
      email,
      showWarningModal: true

    });
  }
  await saveContact(name, hp, email);
  res.redirect('/contact');
});

// Rute untuk menampilkan detail kontak berdasarkan nama
app.get('/contact/detail/:name', async (req, res) => {
  const contactName = req.params.name;
  try {
    const contact = await findContactByName(contactName);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
   res.render('detailContact', { 
    contact: contact,
    title:`Detail Contact Page`,
  });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk menghapus kontak berdasarkan nama
app.post('/contact/delete/:name', async (req, res) => {
  const name = req.params.name; // Mengambil nama kontak dari permintaan POST
  await deleteContact(name); // Menghapus kontak dengan nama yang diberikan
  console.log(`Menghapus kontak dengan nama: ${name}`);
  res.redirect('/contact'); // Mengarahkan kembali ke halaman /contact
});

// Rute untuk menampilkan halaman edit kontak berdasarkan nama
app.get('/contact/edit/:name', async (req, res) => {
  const contactName = req.params.name;
    const contact = await findContactByName(contactName);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.render('editContact', {
      contact: contact,
      title: 'Edit Contact page',
 });
});

// Rute untuk update contact
app.post('/contact/update/:name', async (req, res) => {
  const contactName = req.params.name;
  const { hp, email } = req.body;
  
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
    const contact = await findContactByName(contactName);
    return res.render('editContact', {
      title: 'Edit Contact page',
      contact: contact,
      errorMessage: errorMessage
    });
  }

  // Jika tidak ada kesalahan, lakukan pembaruan kontak
  const success = await updateContact(contactName, hp, email);

  if (success) {
    res.redirect('/contact');
  } else {
    res.status(404).send('Contact not found or update failed.');
  }
});


app.get('/product/:id', (req, res) => {
  res.send(`product id : ${req.params.id} <br> category id : ${req.query.category}`);
});

// Menggunakan app.use untuk penanganan 404
app.use('/', (req, res)=>{
  res.status(404)
  res.send('page not found :404')
});

app.listen(port, () =>{
  console.log(`Example app listening on port ${port}`)
})


// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })