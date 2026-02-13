const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')

connectDB()

const app = express();

// static folder

app.use(express.static(path.join(__dirname, './public')));

//body parser
app.use(express.json()); // lets the server handels json bodies in post or put request
app.use(express.urlencoded({extended:false})) //handles form submission

// give access to get from outside
app.use(
    cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials:true
}));

// Application home page
app.get('/', (req, res)=>{
    res.json({message: 'Wecome to the Random API page'})

});

const ideasRouter = require('./router/ideas');
app.use('/api/ideas', ideasRouter);


// // Get all idea
// app.get('/api/ideas', (req, res)=>{
//     res.json({success:true, data:post})np

// });

// // Get idea by Id
// app.get('/api/ideas/:id', (req, res)=>{

//     const idea = post.find(idea => idea.id === +req.params.id)

//     if(!idea){
//         return res
//         .status(404)
//         .json({success:false, error: 'Resource not found atall, yinmu'})
//     }

//     res.json({success:true, data: idea})
// });




app.listen(port, () => console.log(`Server is listening on port ${port}`))