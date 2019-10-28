const express = require('express');
const app = express();



app.use(express.json());

const users = [
    {
        id: 1,
        name: 'Richard'
    }
];

app.get('/', (req, res) => {
    res.send({
        message: "Hello Welcome to the API"
    });
});


app.get('/users', (req, res) => {
    res.send(users);
});


app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User Not Found!');

    res.send(user);
});


app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    }

    users.push(user);
    res.status(201).json({
        status: 201,
        message: "User Created!!",
        data: user
    })
});


app.put('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User Not Found');

    user.name = req.body.name
    res.send({
        message: 'User Updated!!',
        data: user
    })

});

app.delete('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User Not Found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send({
        message: "User Deleted!!",
        data: user
    })
});


const port = process.env.PORT || 3000;
app.listen(port, console.log(`The app is listening on port ${port}`))

module.exports = app;