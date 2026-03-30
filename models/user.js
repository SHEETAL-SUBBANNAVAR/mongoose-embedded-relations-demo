const mongoose = require("mongoose");
require("dotenv").config();
// console.log("DB URL:", process.env.DB_URL);
main().then(() => console.log("Connection Successful")).catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/RelationDemo");
}
const userSchema = new mongoose.Schema({
  username: String,
  address: [{
    _id :false,
    location: String,
    city: String
  },
  ],
});

const User = mongoose.model("User", userSchema);
const addUSer = async () => {
  const user1 = new User({
    username: "John Doe",
    address: [
      {
        location: "123 Main St",
        city: "New York"
      },
      {
        location: "456 Elm St",
        city: "Los Angeles"
      }
    ]
  });
  user1.address.push({
    location: "789 Oak St",
    city: "Chicago"
  });
  let result  = await user1.save();
  console.log("User saved:", result);
}

addUSer();