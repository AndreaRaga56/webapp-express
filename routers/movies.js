import express from 'express';
import movieController from '../Controllers/movieController.js';
const routers = express.Router();

//Index
routers.get("/", movieController.index);

//Show
routers.get("/:id", movieController.show);

export default routers;
