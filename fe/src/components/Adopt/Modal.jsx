import { useState, useContext, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { petsReducer, initialPets } from "../../reducers/petsReducer";
import axios from "axios";

export default function Modal({ isToggled, setIsToggled }) {
  const navigate = useNavigate();
  const { user: { accessToken }, BASE_URL } = useContext(Context);
  const [state, dispatch] = useReducer(petsReducer, initialPets);
  const [error, setError] = useState("");
  const { petId } = useParams();

  const handleClick = async (e) => {
    try {
      await axios.delete(
        `${BASE_URL}/pets/${petId}`, 
        { 
          headers: { Authorization: `Bearer ${accessToken}` }, 
          data: { reason: e.target.value }
        },
      );

      dispatch({ type: "PETS_REMOVE", payload: e.target.value });
      setIsToggled(false);
      navigate("/adopt");
      
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div id="modal" className="p-4 w-full max-w-md max-h-full z-50" style={{display: isToggled ? "block" : "none"}}>
      <div className="relative bg-slate-700 rounded-lg shadow">
        <button onClick={() => setIsToggled(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Cancel</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-white">Are you sure you want to remove this posting? Please provide a reason.</h3>
          <button onClick={handleClick} value="Cancelled" className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
            Cancelled
          </button>
          <button onClick={handleClick} value="Adopted" className="ml-3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
            Adopted
          </button>
        </div>
        {error && 
        <p className="px-1 py-1 flex gap-1 mb-4 border border-red-400 text-sm rounded-b-md bg-red-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          {error}
        </p>
        }
      </div>
    </div>
  )
}
