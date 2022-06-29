require('dotenv').config();
const express =require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine' , 'ejs');



const admin_routes = require('./Routes/Admin');
app.use('/',admin_routes);


const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } , 
    (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("db connected");
        }
        
    }
)

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> {
    console.log(`app started at port ${PORT}`)
})