const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Habit = require("../src/models/habitModel");

describe("Habit API", () => {
  beforeAll(async () => {
    const url =
      process.env.MONGODB_URI || "mongodb://localhost:27017/habit-tracker-test";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Habit.deleteMany({});
  });

  it("should create a new habit", async () => {
    const res = await request(app)
      .post("/api/habits")
      .send({ name: "Exercise", frequency: "Daily" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Exercise");
  });

  it("should get all habits", async () => {
    await Habit.create({ name: "Exercise", frequency: "Daily" });
    const res = await request(app).get("/api/habits");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a habit by id", async () => {
    const habit = await Habit.create({ name: "Exercise", frequency: "Daily" });
    const res = await request(app).get(`/api/habits/${habit._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Exercise");
  });

  it("should update a habit", async () => {
    const habit = await Habit.create({ name: "Exercise", frequency: "Daily" });
    const res = await request(app)
      .put(`/api/habits/${habit._id}`)
      .send({ name: "Running", frequency: "Weekly" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Running");
  });

  it("should delete a habit", async () => {
    const habit = await Habit.create({ name: "Exercise", frequency: "Daily" });
    const res = await request(app).delete(`/api/habits/${habit._id}`);

    expect(res.statusCode).toEqual(204);
    const deletedHabit = await Habit.findById(habit._id);
    expect(deletedHabit).toBeNull();
  });
});
