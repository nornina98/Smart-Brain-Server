const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '001',
            name: 'kasyaf',
            email: 'kasyaf1234@gmail.com',
            password: 'kasyaf1234',
            entries: 0,
            joined: new Date()
        },
        {
            id: '002',
            name: 'muya',
            email: 'muya1234@gmail.com',
            password: 'muya1234',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => { 
    res.send(database.users);
})

app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error to login');
        }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '003',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
    console.log('app working');   
})