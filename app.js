const path = require('path');
const express = require('express');
const mongooss = require('mongoose');
const todoRoutes = require('./routes/todos');
const exprhbs = require('express-handlebars');
const DatabaseConnections = 'mongodb+srv://sergey:1234@cluster0.7n4gt.mongodb.net/todos';

const port = process.env.port || 3000;
const app = express();

const hbs = exprhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes);

async function start() {
    try {
        await mongooss.connect(DatabaseConnections, {
            useNewUrlParser: true,
            // useFindAndModify:false
        });
        app.listen(port, () => {
            console.log('Server started');
        });
    } catch (error) {
        console.log(error);
    }
}

start();