require('dotenv').config();
const express =require('express');
const app = express();

app.use(express.json());

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