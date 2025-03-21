const mongoose = require("mongoose");

function ConnectDB(URL) {
  mongoose
    .connect(URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("There is Error Check Internet Connection :",err));
}
module.exports = ConnectDB;
