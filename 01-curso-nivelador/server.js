const express = require('express')
const app = express()
const port = 3000
const cowsay = require('cowsay');

app.get('/', (req, res) => {
    const message = 'Esto es una petición GET';
    console.log(
        cowsay.say({
        text: message,
        e: 'o0',
        T: 'U',
    }));
    res.send({
        data: message,
    })
})

app.post('/', (req, res) => {
    const message = 'Esto es una petición POST';
    console.log(
        cowsay.say({
            text: message,
            e: '0o',
            T: 'U',
        })
    )
    res.send({
        data: message,
    })
})

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `
App corriendo en puerto ${port}
http://localhost:${port}
            `,
            e: 'oo',
            T: 'U',
        })
    )
})