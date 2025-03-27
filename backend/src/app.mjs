import express from 'express';
const app = express();

// CONST
const PORT = process.env.PORT || 3000;


// server
app.listen(PORT, (request, response) => {
    console.log("Pokrenut na portu " + PORT);
});