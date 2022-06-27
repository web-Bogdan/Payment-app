
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transaction = require("./controllers/transactionController");


const PORT = 3050;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", transaction);

mongoose.
connect("mongodb+srv://user1234:user1234@cluster0.jcjzk.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("DB error", err));



app.listen(PORT || 3001, (err) => {
    if (err){
        return console.log(err);
    }
    console.log("Server has been started");
});
