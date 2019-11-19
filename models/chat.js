const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: {
    type: String,
    trim: true,
  },
  recieverId: {
    type: String,
    trim: true,
  },
  roomId:{
    type: String,
    trim: true,
  }
});
//hash user password before saving into database
UserSchema.pre("save", function(next) {
  next();
});
module.exports = mongoose.model("chat", UserSchema);
