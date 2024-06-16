import express from 'express';
import { addFeedback, getAverageRating, getFeedbackByEmail } from '../controllers/feedbackController.js';
const feedbackRouter = express.Router();

feedbackRouter.get("/average", getAverageRating);
feedbackRouter.post("/add", addFeedback);
feedbackRouter.get("/:email", getFeedbackByEmail);
export default feedbackRouter;