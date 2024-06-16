import reserveModel from "../models/reserveModel.js";

// Add reservation
const addReservation = async (req, res) => {
    console.log(req.body); // Log the request body to inspect the received data

    const reservationData = req.body; // Assuming req.body contains JSON data with reservation details

    // Construct a new reservation object using the received JSON data
    const reservation = new reserveModel({
        email: reservationData.email,
        capacity: reservationData.capacity,
        date: reservationData.date,
        hour: reservationData.hour,
    });

    try {
        // Save the reservation to the database
        await reservation.save();
        res.json({ success: true, message: "Reservation Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// List all reservations
const listReservations = async (req, res) => {
    try {
        const reservations = await reserveModel.find({});
        res.json({ success: true, data: reservations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

const userReservations = async (req, res) => {
    try {
        const reservations = await reserveModel.find({ email: req.body.email });
        res.json({ success: true, data: reservations })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addReservation, listReservations, userReservations };
