//Express init
import express from 'express';
const app = express();
const port = process.env.SERVER_PORT;
import movieRouter from './routers/movies.js';
import handleError from './Middleware/handleError.js';
import notFound from './Middleware/notFound.js';
import corsMiddleware from 'cors'

app.use(corsMiddleware({
    origin:"http://localhost:5173",
}));

app.use(express.json());

app.use(express.static("public"));

app.use("/movies", movieRouter);

app.use(handleError)

app.use(notFound)

app.listen(port, () => {
    console.log("Ascolto mode ON");
});
