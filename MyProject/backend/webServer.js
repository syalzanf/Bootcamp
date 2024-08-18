const fs = require('fs');
const http = require('http');


const renderHTML = (path, res) =>{
    fs.readFile(path,(err,data) =>{
        if(err){
            res.writeHead(404);
            res.write('Error : page not found');
        } else {
            res.write(data)
        }
        res.end();
    })
}

http.createServer((req,res) =>{

    const url = req.url;
    console.log(url);

    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    // res.write('Hello world!');
    // res.end();

    if(url==='/about'){
        // res.write('<h1>this is about page</h1>');
        // res.end();
        renderHTML('./about.html', res);

    }else if(url==='/contact'){
        renderHTML('./contact.html', res);

    } else {
        renderHTML('./index.html', res);
    }
})

.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});

