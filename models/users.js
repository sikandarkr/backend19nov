const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  profileUrl:{
    type:String,
    default:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  },
  country:{
    type: String,
    trim: true
  },
  socketId:{
    type: String,
    trim: true,
    default:"xyz-abcdefghjk"
  },
  state:{
    type: String,
    trim: true,
  },
  zipcode:{
    type: String
  },
  gender:{
    type:String
  },
  upvote:{
    type:Number,
    default:0
  },
  downvote:{
    type:Number,
    default:0
  },
  rating:{
    type:String
  },
  domain:{
    type:String
  },
  skillFirst: {
    type:String
  },
  skillSecond:{
    type:String
  },
  skillThird:{
    type:String
  },
  skillFourth:{
    type:String
  },
  skillFifth:{
    type:String
  },
  tech : [{
        technology : String,
    }],
  status:{
    type: Boolean,
    default: false
  },
  onlineStatus:{
    type: Boolean,
    default:false
  },
  isAvailable:{
    type: Boolean,
    default: false
  },
});
//hash user password before saving into database
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("users", UserSchema);
