import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addReservation, listReservations, userReservations } from '../controllers/reserveController.js';

const reserveRouter = express.Router();

reserveRouter.post("/add", addReservation);
reserveRouter.post("/myreservations",authMiddleware,userReservations);
reserveRouter.get("/list", listReservations)
export default reserveRouter;