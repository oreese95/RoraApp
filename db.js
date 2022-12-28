const mongoose = require("mongoose");

function connectDB() {
  // mongoose.connect("mongodb://localhost:27017/roraApp", {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // });
  mongoose.connect(
    "mongodb+srv://ojr:inb6KBmkDre!vk3@cluster0.7hgnf9t.mongodb.net/Rora",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successful");
  });

  connection.on("error", () => {
    console.log("Mongo DB Connection Failed");
  });
}

connectDB();

module.exports = mongoose;
