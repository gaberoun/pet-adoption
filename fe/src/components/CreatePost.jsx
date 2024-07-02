import { useContext, useState, useReducer, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Context from "../context/Context";
import { petsReducer, initialPets } from "../reducers/petsReducer";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { user: { accessToken }, isLoggedIn, BASE_URL } = useContext(Context);
  const [fields, setFields] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    sex: "Male",
    location: "",
    description: "",
    imageFile: {}
  });
  const [state, dispatch] = useReducer(petsReducer, initialPets);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Organize data before submission
      let data = {};
      for (var key in fields) {
        if (key != "imageFile") {
          data[key] = fields[key].trim();
          data[key] = data[key].charAt(0).toUpperCase() + data[key].slice(1);
        }
      }
   
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("species", data.species);
      formData.append("breed", data.breed);
      formData.append("age", data.age);
      formData.append("sex", data.sex);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("pet-image", fields.imageFile);

      const newPet = await axios.post(
        `${BASE_URL}/pets`, 
        formData, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      dispatch({ type: "PETS_ADD", payload: newPet });
      navigate("/adopt");

    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  }


  return (
    <>
      <Link to="/" className="uppercase border border-black rounded-md px-3 py-1.5 text-sm font-medium leading-6 shadow-sm hover-bg-accent">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </Link>

      <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
        Put Animal for Adoption
      </h2>

      <form 
        className="space-y-6 mt-8 mx-auto w-11/12 max-w-xl grid md:grid-cols-2 items-end gap-x-4" 
        onSubmit={handleSubmit}
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">*Pet's Name</label>
          <input 
            type="text" 
            value={fields.name} 
            onChange={(e) => setFields({ ...fields, name: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">*Species</label>
          <div className="flex w-full p-1.5">
            <div className="flex items-center me-4">
              <input 
                onChange={(e) => setFields({ ...fields, species: e.target.value })}
                checked={fields.species === "Dog"}
                type="radio" 
                value="Dog" 
                name="species" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
              />
              <label className="ms-2 text-sm text-gray-900">Dog</label>
            </div>
            <div className="flex items-center me-4">
              <input 
                onChange={(e) => setFields({ ...fields, species: e.target.value })}
                checked={fields.species === "Cat"}
                type="radio" 
                value="Cat" 
                name="species" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
              />
              <label className="ms-2 text-sm text-gray-900">Cat</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">*Sex</label>
          <div className="flex w-full p-1.5">
            <div className="flex items-center me-4">
              <input 
                onChange={(e) => setFields({ ...fields, sex: e.target.value })}
                checked={fields.sex === "Male"}
                type="radio" 
                value="Male" 
                name="sex" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
              />
              <label className="ms-2 text-sm text-gray-900">Male</label>
            </div>
            <div className="flex items-center me-4">
              <input 
                onChange={(e) => setFields({ ...fields, sex: e.target.value })}
                checked={fields.sex === "Female"}
                type="radio" 
                value="Female" 
                name="sex" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
              />
              <label className="ms-2 text-sm text-gray-900">Female</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Breed</label>
          <input 
            type="text" 
            value={fields.breed} 
            onChange={(e) => setFields({ ...fields, breed: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">*Age</label>
          <input 
            type="number" 
            value={fields.age} 
            onChange={(e) => setFields({ ...fields, age: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            min={0}
            max={20}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">*Location</label>
          <input 
            type="text" 
            value={fields.location} 
            onChange={(e) => setFields({ ...fields, location: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">*Upload an Image</label>
          <input 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            type="file"
            id="file-input"
            onChange={(e) => setFields({ ...fields, imageFile: e.target.files[0] })}   
            required
          />
          <p className="mt-1 text-sm text-gray-500">{`PNG, JPG or JPEG (Recommended: < 800x400px)`}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">*Description</label>
          <textarea 
            className="block w-full text-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6" 
            type="text" 
            rows={4}
            value={fields.description} 
            placeholder="Write about your pet here..."
            onChange={(e) => setFields({ ...fields, description: e.target.value })} 
            required
          />
        </div>
        <button className="md:col-span-2 flex uppercase w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:brightness-75" type="submit">
          Submit
        </button>

        {error && 
          <p className="md:col-span-2 px-1 py-1 flex gap-1 mb-4 border border-red-400 text-sm rounded-md bg-red-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 inline">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {error}
          </p>
        }
      </form>
    </>
  )
}
