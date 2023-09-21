const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/authController");

router.post("/signup", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
