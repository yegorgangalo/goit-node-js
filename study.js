// console.log('hello world');
// console.log(__dirname);
// console.log(__filename);

// global.nameOfArg = 5;
// process.exit(0);
// console.log(process.argv);
// console.log(process.env);

// NODE_ENV=development IS_TEST=true node index.js

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/example', (req, res, next) => {
    res.set('Set-Cookie', 'asd=asdasdasdasd');
    const err = new Error();
    err.status = 400;
    next(err);
    },
    (req, res, next) => {
        console.log('second middleware');
    return res.send({hello:'hello world'});
    })

app.post('/example', (req, res, next) => {
    console.log(req.body);
    res.send(req.body);
})

app.use((err, req, res, next) => {
    delete err.stack;
    next(err);
})

app.listen(3000, () => {
    console.log('Starting listening on port', 3000);
})

// const http = require('http');
// const server = http.createServer((req, res) => {
//     console.log('request recieved');

//     //1. http method
//     //2. path-params & query
//     //3. request body
//     //4.header

//     const method = req.method;// GET, POST, PUT...
//     const pathParamsAndQuery = req.url;
//     const headers = req.headers;

//     let body = '';
//     req.on('data', (bodyChunk) => {
//         console.log('bodyChunk=',bodyChunk);
//         body += bodyChunk.toString();
//     })

//     req.on('end', () => {
//         //body received
//         console.log('req=', req);

//         res.writeHead(201, {
//             "Content-Type": "text/plain"
//         })
//         res.end(body);
//     })
// })

// server.listen(80, () => {
//     console.log('Starting listening on port', 80);
// })




//1. in callback first argument is error
// fs.writeFile('example.txt', 'first creation', (err) => {
//     if (err) console.log(err);
// })

// fs.readFile('example.txt', 'utf-8', (err, data) => {
//     console.log(data);

//     fs.appendFile('example.txt', 'second write', (err) => {
//         if (err) console.log(err);
//     })
// })

// fsPromises.writeFile('example.txt', 'reWrite')
//     .then(() => fsPromises.readFile('example.txt', 'utf-8'))
//     .then((data) => {
//         console.log(data);
//         fsPromises.appendFile('example.txt', 'second reWrite')
//     })
//     .catch((err) => console.log(err));

// async function main() {
//     await fsPromises.writeFile('example.txt', 'reWrite');
//     const data = await fsPromises.readFile('example.txt', 'utf-8');
//     console.log(data);
//     await fsPromises.appendFile('example.txt', 'second reWrite');
// }

// main();

// async function main2() {
//     const contactsPath = path.join(__dirname, "./db/contacts.json");
//     console.log(await fsPromises.readFile(contactsPath, "utf-8"));
// }

// main2();