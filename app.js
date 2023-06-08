const path = require('path');
const express = require("express")
const advisorRoutes = require('./routes/advisorRoutes');
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
dotenv.config();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: "https://career-advisor.onrender.com/",
    methods: "POST",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// routes
app.use('/test', advisorRoutes);


app.use('*', (req, res) => {
    res.send('Invalid URL')
})



const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
