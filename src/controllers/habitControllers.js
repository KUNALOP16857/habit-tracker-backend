class HabitController {
  constructor(habitService) {
    this.habitService = habitService;
  }

  async createHabit(req, res) {
    try {
      const habit = await this.habitService.createHabit(req.body);
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getHabit(req, res) {
    try {
      const habit = await this.habitService.getHabit(req.params.id);
      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }
      res.status(200).json(habit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateHabit(req, res) {
    try {
      const updatedHabit = await this.habitService.updateHabit(
        req.params.id,
        req.body
      );
      if (!updatedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }
      res.status(200).json(updatedHabit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteHabit(req, res) {
    try {
      const deletedHabit = await this.habitService.deleteHabit(req.params.id);
      if (!deletedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default HabitController;
