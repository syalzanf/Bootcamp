const express = require ('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan')
const path = require('path'); 
const fs = require ('fs')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Request Path:', req.path);
  next();
});

// app.get('/', (req, res)=>{
//   res.sendFile('./home.html',{root:__dirname});
// })

app.get('/', (req, res)=>{
  res.render('home', {
    nama: 'Syalza',
    layout:"layout",
    title: 'home page'})
})

app.get('/about', (req, res)=>{
  res.render('about', {
    layout:"layout",
    title: 'about page'})
})

app.get('/contact', (req, res) => {

  const filePath = path.join(__dirname, 'data', 'contacts.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    try {
      const contacts = JSON.parse(data);

      console.log('JSON success:', contacts);

      res.render('contact', {
        title: 'Contact Page',
        contact: contacts,
        layout: "layout" });

    } catch (jsonErr) {
      console.error('Error parsing JSON:', jsonErr);
      res.status(500).send('Internal Server Error');
    }
  });
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