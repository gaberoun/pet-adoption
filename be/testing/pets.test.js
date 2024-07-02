import request from "supertest";
import app from "../index.js";

describe("GET /api/v1/pets/", () => {
  test("View all pets", async () => {
    await request(app)
      .get("/api/v1/pets/")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("GET /api/v1/pets/:petId", () => {
  const validId = "666852b4cc2914e7b4a5f55e";

  test("View valid pet", async () => {
    await request(app)
      .get(`/api/v1/pets/${validId}`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("View invalid pet", async () => {
    await request(app)
      .get("/api/v1/pets/123")
      .expect(500)
      .expect("Content-Type", /json/);
  });
});
