const Habit = require("../models/habitModel");

class HabitService {
  async createHabit(habitData) {
    const habit = new Habit(habitData);
    return await habit.save();
  }

  async getHabit(habitId) {
    return await Habit.findById(habitId);
  }

  async updateHabit(habitId, habitData) {
    return await Habit.findByIdAndUpdate(habitId, habitData, { new: true });
  }

  async deleteHabit(habitId) {
    return await Habit.findByIdAndDelete(habitId);
  }

  async getAllHabits() {
    return await Habit.find();
  }
}

module.exports = new HabitService();
