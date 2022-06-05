require('dotenv').config();
const express =require('express');
const app = express();

app.use(express.json());

const admin_routes = require('./Routes/Admin');
app.set('/',admin_routes);


const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  } , 
    () => {
        console.log("db connected");
    }
)

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> {
    console.log(`app started at port ${PORT}`)
})