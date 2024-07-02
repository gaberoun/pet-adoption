import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import NotFound from "../NotFound";

export default function PetDetails() {
  const { user: { userId }, BASE_URL } = useContext(Context);
  const { petId } = useParams();
  const [pet, setPet] = useState({});
  const [isToggled, setIsToggled] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/pets/${petId}`);
        setPet(data);

      } catch (error) {
        console.error(error);
        setError(true);
      }
    })();
  });

  if (error) return <NotFound />;

  const displayDelete = userId != pet.userId
    ? <div></div>
    : (<div onClick={() => setIsToggled(true)} className='font-medium text-red-700 justify-self-end absoulte text-sm hover:brightness-75 cursor-pointer'>
        <FontAwesomeIcon icon={faSquareMinus} /> Remove pet
      </div>)

  return (
    <>
      <Link to="/adopt" className="uppercase border border-black rounded-md px-3 py-1.5 text-sm font-medium leading-6 shadow-sm hover-bg-accent">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Browsing
      </Link>
      <div className="mt-8 bg-container shadow-md rounded-md p-5 pt-2 max-w-4xl mx-auto">
        <h1 className="p-2 text-3xl text-center md:text-left font-semibold capitalize">{pet.name}</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <img className="aspect-square h-auto w-full object-cover object-center rounded-md" src={pet.image?.path} alt={pet.name} />
          <div className="font-normal capitalize flex flex-col justify-between">
            <ul>
              <li className="normal-case"><span className="font-medium">Description:</span> {pet.description}</li>
              <li><span className="font-medium">Age:</span> {pet.age}</li>
              <li><span className="font-medium">Sex:</span> {pet.sex}</li>
              <li><span className="font-medium">Breed:</span> {pet.breed}</li>
              <li><span className="font-medium">Location:</span> {pet.location}</li>
            </ul>
            <Link to={`/users/${pet.userId}`} className="mt-4 justify-self-end md:place-self-end text-center uppercase rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:brightness-75">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="flex justify-between place-items-end mt-2">
          {displayDelete}
          <p className="mt-2 text-sm font-light">Posted on: {moment(pet.createdAt).format("MMMM Do YYYY")}</p>
        </div>
      </div>
      <Modal isToggled={isToggled} setIsToggled={setIsToggled} />
    </>
  )
}
