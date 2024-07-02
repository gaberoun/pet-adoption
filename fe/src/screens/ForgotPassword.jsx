import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Context from "../context/Context";

export default function ForgotPassword() {
  const { BASE_URL } = useContext(Context);
  const navigate = useNavigate();
  const [error, login] = useLogin();
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirm: ""
  });
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Organize data before submission
      const data = {
        email: fields.email.toLowerCase().trim(),
        password: fields.password,
        confirm: fields.confirm,
      }

      await axios.put(`${BASE_URL}/users/change`, data);
      login(e, { email: data.email, password: data.password });

    } catch (err) {
      console.error(err);
      setWarning(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto w-11/12 my-10">
      <Link to="/" className="uppercase border border-black rounded-md px-3 py-1.5 text-sm font-medium leading-6 shadow-sm hover-bg-accent">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </Link>

      <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
        Reset Password
      </h2>

      <form 
        className="space-y-6 mt-10 max-w-sm mx-auto" 
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <input 
            required 
            type="email" 
            value={fields.email} 
            onChange={(e) => setFields({ ...fields, email: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="text-sm font-medium leading-6 text-gray-900">Password</label>
          <input 
            required 
            type="password" 
            value={fields.password} 
            onChange={(e) => setFields({ ...fields, password: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <input 
            required 
            type="password" 
            value={fields.confirm} 
            onChange={(e) => setFields({ ...fields, confirm: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button className="flex uppercase w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:brightness-75" type="submit">
          Submit
        </button>

        {warning && 
          <p className="px-1 py-1 flex gap-1 mb-4 border border-red-400 text-sm rounded-md bg-red-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 inline">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {warning}
          </p>
        }
      </form>
    </div>
  );
};
