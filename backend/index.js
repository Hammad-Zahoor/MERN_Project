const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
const firebase = require("firebase/compat/app");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }));

const firebaseConfig = {};
firebase.initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
})

app.use(express.json())
app.use('/api',require("./Routes/create_user"))
app.use('/api',require("./Routes/display_profile"))
app.use('/api',require("./Routes/create_post"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})