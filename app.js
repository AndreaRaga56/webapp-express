//Express init
import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

//Cartelle pubblihe
app.use(express.static("public"));


app.listen(port, () => {
    console.log("Ascolto mode ON");
});
