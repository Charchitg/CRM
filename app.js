require('dotenv').config();
const express =require('express');
const app = express();
const admin_routes = require('./Routes/Admin');
const PORT = process.env.PORT || 5000


app.use(express.json());
app.set('/',admin_routes);


const mongoose = require('mongoose');

// mongoose.connect(
//     process.env.MONGODB_URI , {
//         UseModifiedTopology : true , 
//         UsenewUrlParser : true
//     } , 
//     () => {
//         console.log("db connected");
//     }
// )

app.listen(PORT , ()=> {
    console.log(`app started at port ${PORT}`)
})