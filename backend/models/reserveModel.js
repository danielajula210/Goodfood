import mongoose from "mongoose";

const reserveSchema = new mongoose.Schema({
    email: {type:String, required:true},
    capacity: {type:Number, required:true},
    date: {type:Date, required:true},
    hour: {type:Number, required:true},


});

const reserveModel = mongoose.models.reserve || mongoose.model("reserve", reserveSchema);

export default reserveModel;