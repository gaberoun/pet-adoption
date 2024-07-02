import { useContext, useState } from "react";
import useLogin from "../hooks/useLogin";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Context from "../context/Context";

export default function RegisterScreen() {
  const { BASE_URL } = useContext(Context);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    site: "",
    url: "",
  });
  const [error, login] = useLogin();
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Organize data before submission
      let data = {};
      for (var key in fields) {
        data[key] = fields[key].trim();
        
        if (key == "firstName" || key == "lastName") 
          data[key] = data[key].charAt(0).toUpperCase() + data[key].slice(1);
        if (key == "email" || key == "url") 
          data[key] = data[key].toLowerCase();
      }

      const fixedData = {
        ...data,
        link: {
          site: data.site,
          url: data.url
        },
      }

      await axios.post(`${BASE_URL}/users/register`, fixedData);
      login(e, { email: fixedData.email, password: fixedData.password });

    } catch (err) {
      console.error(err);
      setWarning(err.response.data.message);
    }
  };


  return (
    <div className="mx-auto w-11/12 my-10">
      <Link to="/login" className="uppercase border border-black rounded-md px-3 py-1.5 text-sm font-medium leading-6 shadow-sm hover-bg-accent">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Login
      </Link>

      <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
        Register an account
      </h2>

      <form 
        className="space-y-6 mt-8 mx-auto w-11/12 max-w-xl grid md:grid-cols-2 items-end gap-x-4" 
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">*First Name</label>
          <input 
            required 
            type="text" 
            value={fields.firstName} 
            onChange={(e) => setFields({ ...fields, firstName: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">*Last Name</label>
          <input 
            required 
            type="text" 
            value={fields.lastName} 
            onChange={(e) => setFields({ ...fields, lastName: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">*Email</label>
          <input 
            required 
            type="email" 
            value={fields.email} 
            onChange={(e) => setFields({ ...fields, email: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">*Password</label>
          <input 
            required 
            type="password" 
            value={fields.password} 
            onChange={(e) => setFields({ ...fields, password: e.target.value })} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">+63</span>
            </div>
            <input 
              type="text" 
              value={fields.phone} 
              onChange={(e) => setFields({ ...fields, phone: e.target.value })} 
              className="block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Link</label>
          <div className="relative rounded-md shadow-sm">
            <input 
              type="text" 
              className="block w-full rounded-md border-0 p-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
              onChange={(e) => setFields({ ...fields, url: e.target.value })}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label className="sr-only">Site</label>
              <select 
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm"
                onChange={(e) => setFields({ ...fields, site: e.target.value })}
                value={fields.site}
              >
                <option value="" disabled>Site</option>
                <option>Facebook</option>
                <option>X</option>
                <option>Instagram</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <button className="md:col-span-2 flex uppercase w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:brightness-75" type="submit">
          Submit
        </button>

        {warning && 
          <p className="md:col-span-2 px-1 py-1 flex gap-1 mb-4 border border-red-400 text-sm rounded-md bg-red-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 inline">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {warning}
          </p>
        }
      </form>
    </div>
  )
}
