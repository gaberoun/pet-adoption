import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { createAccessToken } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

// Create a user where phone and link are optional fields and email is unique
export const signup = asyncHandler(async (request, response) => {
  const { firstName, lastName, phone, link, email, password } = request.body;

  // Validators
  if (/[^a-zA-Z\s]+/.test(firstName) || /[^a-zA-Z\s]+/.test(lastName)) {
    response.status(400);
    throw new Error ("Name must only contains letters."); 
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    response.status(400);
    throw new Error ("Email is already taken.");
  }

  if (!validator.isEmail(email)) {
    response.status(400);
    throw new Error ("Email entered was invalid.");
  }

  if (password.length < 4) {
    response.status(400);
    throw new Error ("Password must be at least 4 characters.");
  }

  if (phone && phone != "") {
    if (!validator.isMobilePhone(phone)) {
      response.status(400);
      throw new Error ("Email entered was invalid.");
    }
  }

  if (link?.url && link?.url != "") {
    if (!validator.isURL(link?.url)) {
      response.status(400);
      throw new Error ("URL entered was invalid.");
   }
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    phone,
    link,
    email,
    password: hash,
  });
  await newUser.save();

  response.status(201).send({
    message: "New user has been created.",
    data: newUser,
  });
});

// Log in using an existing user
export const signin = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  if (!user) {
    response.status(404);
    throw new Error ("User does not exist.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    response.status(400);
    throw new Error ("Password did not match.");
  } 

  response.status(200).send({
    message: "Login successful.",
    data: {
      accessToken: createAccessToken(user),
      userId: user._id
    },
  });
});

// View a user's profile
export const getUser = asyncHandler(async (request, response) => {
  const { userId } = request.params;

  const user = await User.findOne({ _id: userId })
    .select("-updatedAt, -_id, -password");
  
  if (!user) {
    response.status(404);
    throw new Error ("User does not exist");
  }

  response.status(200).send({
    message: `User with ID ${userId}`,
    data: user,
  });
});

// Update a user's password
export const changePassword = asyncHandler(async (request, response) => {
  const { email, password, confirm } = request.body;

  // Validators
  const user = await User.findOne({ email });
  if (!user) {
    response.status(404);
    throw new Error ("User does not exist.");
  }

  if (password.length < 4) {
    response.status(400);
    throw new Error ("Password must be at least 4 characters.");
  }

  if (password != confirm) {
    response.status(400);
    throw new Error ("Passwords entered do not match.");
  }

  const hash = await bcrypt.hash(password, 10);
  const updatedUser = await User.findOneAndUpdate(
    {email},
    {password: hash},
    {new: true}
  )

  if (!updatedUser) {
    response.status(404);
    throw new Error ("Something went wrong with changing password.");
  }

  response.status(200).send({
    message: "Password was updated.",
    data: updatedUser
  });
});