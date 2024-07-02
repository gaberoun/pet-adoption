import validator from "validator";
import Pet from "../models/pet.model.js";
import { cloudinary } from "../config/storage.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { storage } from "../config/storage.js";


// Post a pet for adoption where breed is optional
export const addPet = asyncHandler(async (request, response) => {
  const { 
    userId, 
    species, 
    name, 
    breed, 
    age, 
    sex, 
    description, 
    location 
  } = request.body;
  const { path, filename } = request.file;

  // Validators
  if (breed && breed != "") {
    if (/[^a-zA-Z\s]+/.test(breed)) {
      response.status(400);
      throw new Error ("Breed must only contains letters."); 
    }
  }

  if (age < 0 || age > 20) {
    response.status(404);
    throw new Error ("Pet age must between 0 to 20 years.");
  }

  const newPet = new Pet({ 
    userId, 
    species, 
    name, 
    breed, 
    age, 
    sex, 
    description, 
    location,
    image: { path, filename },
    availability: "Available"
  });
  
  await newPet.save();

  response.status(201).send({
    message: "New pet has been posted.",
    data: newPet,
  });
});

// Get all pets that are not yet removed
export const getAllPets = asyncHandler(async (request, response) => {
  const pets = await Pet.find({ availability: "Available" })
    .select(["_id", "name", "image"]);

  response.status(200).send({
    message: "List of pets for adoption.",
    data: pets,
  });
});

export const getFilteredPets = asyncHandler(async (request, response) => {
  const filter = request.params.filter || "None";
  let query;

  if (filter == "None") {
    query = { availability: "Available" };

  } else { 
    const format = filter.charAt(0).toUpperCase() + filter.slice(1);
    query = { availability: "Available", species: format };
  }

  const pets = await Pet.find(query).select(["_id", "name", "image"]);

  response.status(200).send({
    message: "List of pets for adoption.",
    data: pets,
  });
});


// Get pet details
export const getPetById = asyncHandler(async (request, response) => {
  const { petId } = request.params;

  const pet = await Pet.findOne({ _id: petId })
    .select("-updatedAt, -_id, -species");

  if (!pet || pet.availability != "Available") {
    response.status(404);
    throw new Error ("Pet does not exist");
  }

  response.status(200).send({
    message: `Pet with ID ${petId}`,
    data: pet,
  });
});

// Soft delete a posted pet which requires a reason
export const removePet = asyncHandler(async (request, response) => {
  const { petId } = request.params;
  const { reason } = request.body;

  if (!reason || (reason != "Cancelled" && reason != "Adopted")) {
    response.status(400);
    throw new Error ("Reason for deletion is required. (Cancelled/Adopted)");
  }

  const pet = await Pet.findOne({ _id: petId })
    .select(["image", "availability"]);

  if (!pet || pet.availability != "Available") {
    response.status(404);
    throw new Error ("Pet does not exist");
  }

  const removedPet = await Pet.findOneAndUpdate(
    { _id: petId },
    { availability: reason },
    { new: true }
  );

  response.status(204).send({
    message: `Removed pet with ID ${petId}`,
    data: removedPet,
  });
});


// RESTRICTED for storage fix
export const purgeRemovedPets = asyncHandler(async (request, response) => {
  const pets = await Pet.find({ availability: { $ne: "Available" } })
  .select(["image"]);
  
  const { deletedCount } = await Pet.deleteMany({ availability: { $ne: "Available" } });
  if (!deletedCount) {
    response.status(404);
    throw new Error ("No pet data to purge.");
  }

  pets.forEach(async (pet) => {
    const { result } = await cloudinary.uploader.destroy(pet.image.filename);
    if (!result) {
      response.status(500);
      throw new Error (`Something went wrong while deleting ${pet.image.filename}`);
    }
  });

  response.status(204).send({ message: `Purged ${deletedCount} pet data` });
});
