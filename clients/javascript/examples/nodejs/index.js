'use strict';

const path = require('path')
const express = require('express')
const expresshbs = require('express-handlebars')

const app = express()
const port = 3000

const Oxygen = require('../../oxygen-client')

app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
    var oxygen = Oxygen('3e061811-7847-44eb-ac81-20a1cada1194', '96015cd5-371b-44e5-8bd0-5733a69ed0f6');

    oxygen.folders.get('06b95d7b-3fb1-42ee-b2a8-21274e269d55', 'live2')
    .then(function(o2response) {
        var data = oxygen.parseResponse(o2response)
        response.render('home', data)
    })
})

app.listen(port)