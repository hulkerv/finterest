const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const {format} = require('timeago.js')

// Initializations
const app = express();
require('./database')

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewaes
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename)=>{
        cb(null, uuidv4() + path.extname(file.originalname));
}
})
app.use(multer({storage}).single('image'));

// Globals variables
app.use((req,res, next) => {
    app.locals.format = format;
    next();
})

// Routes
app.use(require('./routes/index.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(3000, ()=>{
    console.log(`Server on por ${app.get('port')}`);
})
