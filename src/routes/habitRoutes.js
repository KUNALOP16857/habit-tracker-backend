const express = require("express");
const HabitController = require("../controllers/habitController");

const router = express.Router();
const habitController = new HabitController();

router.post("/habits", habitController.createHabit);
router.get("/habits/:id", habitController.getHabit);
router.put("/habits/:id", habitController.updateHabit);
router.delete("/habits/:id", habitController.deleteHabit);
router.get("/habits", habitController.getAllHabits);

module.exports = router;
