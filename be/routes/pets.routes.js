import { Router } from "express";
import multer from "multer";
import { storage } from "../config/storage.js";
import {
  addPet,
  getAllPets,
  getFilteredPets,
  getPetById,
  purgeRemovedPets,
  removePet,
} from "../controllers/pets.controllers.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const petsRouter = Router();
const petImage = multer({ storage });

petsRouter.post("/", petImage.single("pet-image"), verifyAccessToken, addPet);
petsRouter.get("/", getAllPets);
petsRouter.get("/category/:filter?", getFilteredPets);
petsRouter.get("/:petId", getPetById);
petsRouter.delete("/:petId", verifyAccessToken, removePet);

// RESTRICTED for storage fix
petsRouter.delete("/", purgeRemovedPets);

export default petsRouter;
