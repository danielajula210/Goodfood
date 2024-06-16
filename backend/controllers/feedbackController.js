import feedbackModel from "../models/feedbackModel.js";

const addFeedback = async (req, res) => {
    console.log(req.body); // Log the request body to inspect the received data

    const feedbackData = req.body; // Assuming req.body contains JSON data with feedback details

    // Construct a new feedback object using the received JSON data
    const feedback = new feedbackModel({
        email: feedbackData.email,
        feedback: feedbackData.feedback
    });

    try {
        // Save the feedback to the database
        await feedback.save();
        res.json({ success: true, message: "Feedback Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

const getFeedbackByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        // Query the database for feedback records associated with the provided email
        const feedback = await feedbackModel.find({ email: email });
        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback by email:', error);
        res.status(500).json({ success: false, message: "Error fetching feedback" });
    }
};

const getAverageRating = async (req, res) => {
    try {
      const feedbacks = await feedbackModel.find();
      if (!feedbacks) {
        return res.status(404).json({ message: "No feedback found" });
      }
  
      const totalFeedback = feedbacks.reduce((acc, feedback) => acc + feedback.feedback, 0);
      const averageFeedback = totalFeedback / feedbacks.length;
      res.status(200).json({ averageFeedback });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export { addFeedback, getFeedbackByEmail, getAverageRating };