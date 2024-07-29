const express = require ('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

// app.get('/about', (req, res)=>{
//   res.sendFile('./about.html',{root:__dirname});
// })

app.get('/', (req, res)=>{
  
  res.render('home', {nama: 'Syalza' , title: 'home page'})
})

app.get('/about', (req, res)=>{
  res.render('about', {title: 'about page'})
})

app.get('/contact', (req, res)=>{
  const contact = [
    {
      name: "Najmi",
      email: "naj@gmail.com",
    },
    {
      name: "naila",
      email: "naji@gmail.com",
    },
    {
      name: "syalza",
      email: "syalzanf@gmail.com",
    }
]
  res.render('contact', {title: 'contact page', contact : contact})
})


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