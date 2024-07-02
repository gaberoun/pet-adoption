import request from "supertest";
import app from "../index.js";

describe("POST /api/v1/users/register", () => {
  const validRequest = {
    firstName: "First",
    lastName: "Last",
    email: "test@email.com",
    password: "asdf",
    phone: "",
    link: {
      site: "",
      url: ""
    }
  };

  test.skip("Register with a valid request", async () => {
    await request(app)
      .post("/api/v1/users/register")
      .send(validRequest)
      .expect(201)
      .expect("Content-Type", /json/);
  });

  const invalidRequest = {
    firstName: "0ld",
    lastName: "Mcd0nald",
    email: "mcdonalds@email.com",
    password: "123",
    phone: "",
    link: {
      site: "",
      url: ""
    }
  };

  test("Register with invalid request", async () => {
    await request(app)
      .post("/api/v1/users/register")
      .send(invalidRequest)
      .expect(400)
      .expect("Content-Type", /json/);
  });

  const existingUser = {
    firstName: "Alden",
    lastName: "Recharge",
    email: "alden@email.com",
    password: "1234",
    phone: "",
    link: {
      site: "",
      url: ""
    }
  };

  test("Register an existing email", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(existingUser)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Email is already taken.");
  });
});


describe("POST /api/v1/users/login", () => {
  const userCredentials = {
    email: "alden@email.com",
    password: "asdf",
  };

  test("Log in with valid request", async () => {
    await request(app)
      .post("/api/v1/users/login")
      .send(userCredentials)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  const incorrectPassword = {
    email: "alden@email.com",
    password: "abcd",
  };

  test("Log in with incorrect password", async () => {
    const response = await request(app)
      .post("/api/v1/users/login")
      .send(incorrectPassword)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Password did not match.");
  });

  const invalidUser = {
    email: "abcd@email.com",
    password: "abcd",
  };

  test("Log in with invalid user", async () => {
    const response = await request(app)
      .post("/api/v1/users/login")
      .send(invalidUser)
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("User does not exist.");
  });
});


describe("GET /api/v1/users/:userId", () => {
  const validId = "66684a3be810b715cf8ab987";

  test("View valid user", async () => {
    await request(app)
      .get(`/api/v1/users/${validId}`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("View invalid user", async () => {
    await request(app)
      .get("/api/v1/users/123")
      .expect(500)
      .expect("Content-Type", /json/);
  });
});


describe("PUT /api/v1/users/change", () => {
  const userCredentials = {
    email: "alden@email.com",
    password: "1234",
    confirm: "1234"
  };

  test.skip("Change password with valid request", async () => {
    await request(app)
      .put("/api/v1/users/change")
      .send(userCredentials)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  const wrongPasswords = {
    email: "alden@email.com",
    password: "asdf",
    confirm: "asdg",
  };

  test("Change password with non-matching passwords", async () => {
    const response = await request(app)
      .put("/api/v1/users/change")
      .send(wrongPasswords)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Passwords entered do not match.");
  });

  const invalidUser = {
    email: "abcd@email.com",
    password: "abcd",
    confirm: "abcd"
  };

  test("Change password with invalid user", async () => {
    const response = await request(app)
      .put("/api/v1/users/change")
      .send(invalidUser)
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("User does not exist.");
  });

  const invalidPassword = {
    email: "alden@email.com",
    password: "abc",
    password: "abc",
  };

  test("Change password with invalid password", async () => {
    const response = await request(app)
      .put("/api/v1/users/change")
      .send(invalidPassword)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Password must be at least 4 characters.");
  });
});