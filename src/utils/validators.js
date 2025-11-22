module.exports = {
  validateHabit: (habit) => {
    const { title, description, frequency } = habit;
    const errors = [];

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      errors.push("Title is required and must be a non-empty string.");
    }

    if (description && typeof description !== "string") {
      errors.push("Description must be a string if provided.");
    }

    if (!frequency || !["daily", "weekly", "monthly"].includes(frequency)) {
      errors.push(
        "Frequency is required and must be one of: daily, weekly, monthly."
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};
