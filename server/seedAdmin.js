// server/seedAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // change password if needed

    const admin = new Admin({
      username: "admin",
      password: hashedPassword
    });

    await admin.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
