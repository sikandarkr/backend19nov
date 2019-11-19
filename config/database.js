const mongoose = require("mongoose");
let dev_db_url = process.env.MONGO_URL;
// console.log("sik fgasdf   " + dev_db_url);
const mongoDB = dev_db_url;
let success = mongoose.connect(mongoDB);
if (success) {
  console.log("connected successfully");
} else {
  console.log("error while connecting");
}
mongoose.Promise = global.Promise;
module.exports = mongoose;

