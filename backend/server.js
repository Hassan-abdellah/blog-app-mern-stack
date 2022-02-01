const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const bodyparser = require('body-parser'); //Body parsing middle ware
const morgan = require('morgan'); //HTTP request logger middle ware
const multiparty = require('connect-multiparty');

const cors = require('cors');
const dotenv = require('dotenv');


const path = require('path');

const fs = require('fs');


const app = express();


dotenv.config({path: './config/config.env'});

const googleStrategySetup = require('./passport/google');
app.use(cookieSession({
    name: "session",
    keys: ["secretKey"],
    maxAge: 24 * 60 * 60 * 100
}));

const authRoute = require('./routes/auth');

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json());
app.use(
    cors({
    origin: process.env.CLIENT_URI,
    // origin: '*',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
})
);

const MuiltiPartyMiddleware = multiparty({uploadDir:"./uploads"});
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// routes 
app.use('/auth', authRoute);

app.post('/write', (req,res) => {
    const post = req.body;
    res.status(201).json({ msg:'Article Created Successfully',post});
});

app.use(express.static("./uploads"));

app.post('/upload',MuiltiPartyMiddleware ,(req,res) => {

    var TempFile = req.files.upload;
    var TempPathfile = TempFile.path;

   const targetPathUrl = path.join(__dirname,"./uploads/"+TempFile.name);

   if(path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg" || ".jpeg"){
     
    fs.rename(TempPathfile, targetPathUrl, err =>{

        res.status(200).json({
         uploaded: true,
          url: `http://localhost:5000/${TempFile.originalFilename}`
        });

        if(err) {return console.log(err)};
    })
} 
    console.log(req.files)
});

app.get('/:imgName',(req,res) => {
    const imgName = req.params.imgName;
    res.status(200).send(`<img src='./uploads/${imgName}'/>`)
})




// app.get('/uploads/:name',(req,res) => {
//     const {name} = req.params;
//     res.status(200).json({
//         url: `http://localhost:5000/uploads/${name}`
//     })
//     res.send(`http://localhost:5000/uploads/${name}`);
// })
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`))