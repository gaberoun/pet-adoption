import { useContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import Pet from "./Pet";
import { petsReducer, initialPets } from "../../reducers/petsReducer";
import Context from "../../context/Context";

export default function Pets() {
  const [state, dispatch] = useReducer(petsReducer, initialPets);
  const { BASE_URL } = useContext(Context);
  const [filter, setFilter] = useState("");

  const petsList = state.map((pet) => {
    return (
      <Pet
        key={pet._id}
        petId={pet._id}
        name={pet.name}
        imageUrl={pet.image.path}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/pets/category/${filter}`);

      localStorage.setItem("pets", JSON.stringify(data));
      dispatch({ type: "PETS_LIST", payload: data });
    })();  
  }, [state.length, filter]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 name='stats' className='text-3xl font-semibold tracking-tight'>Adopt a Pet</h1>

        <div>
          <h3 className="mb-4 font-semibold text-gray-900 text-right">Filter</h3>
          <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg sm:flex">
            <button onClick={() => setFilter("")} className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r hover-bg-accent rounded-l-lg">
              <label className="w-full p-4 cursor-pointer text-sm font-medium text-gray-900">All </label>
            </button>
            <button onClick={() => setFilter("Dog")} className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r hover-bg-accent">
              <label className="w-full p-4 cursor-pointer text-sm font-medium text-gray-900">Dogs</label>
            </button>
            <button onClick={() => setFilter("Cat")} className="w-full border-b border-gray-300 sm:border-b-0 hover-bg-accent rounded-r-lg">
              <label className="w-full p-4 cursor-pointer text-sm font-medium text-gray-900">Cats</label>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {petsList}
      </div>
    </>
  ) 
};
