
const express = require('express');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cors = require('cors');
const articleRouter = require('./routes/article.routes');
const userRouter = require('./routes/user.routes');
const db = require('./config/database.config');

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(formidable());

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(db.devurl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/user/', userRouter);
app.use('/article/', articleRouter);

const PORT = 3000;
app.listen(process.env.PORT || PORT, console.log('Server started at port 3000'));