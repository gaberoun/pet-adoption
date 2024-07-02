import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Context from "../../context/Context";
import NotFound from "../NotFound";

const sites = {
  Facebook: { ...faFacebook },
  X: { ...faXTwitter },
  Instagram: { ...faInstagram },
  Other: { ...faUser }
}

export default function UserDetails() {
  const { userId } = useParams();
  const { BASE_URL } = useContext(Context);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/users/${userId}`);
        setUser(data);

      } catch (error) {
        console.error(error);
        setError(true);
      }
    })();
  });

  if (error) return <NotFound />;

  const userLink = !user.link ? "N/A" : (
    <a href={user.link?.url}>
      {user.link?.site === "" ? "" : <FontAwesomeIcon icon={ sites[user.link?.site] } />}
      {user.link?.url === "" ? "N/A" : ` ${user.link?.url}`}
    </a>
  )

  return (
    <>
      <Link to="/adopt" className="uppercase border border-black rounded-md px-3 py-1.5 text-sm font-medium leading-6 shadow-sm hover-bg-accent">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Browsing
      </Link>
      <div className="mt-8 bg-container shadow-md rounded-md p-5 pt-2 max-w-4xl mx-auto">
        <h1 className="my-2 text-2xl font-semibold capitalize">{user.firstName} {user.lastName}</h1>
        <div className="font-normal flex flex-col justify-between">
          <ul>
            <li><span className="font-medium">Email:</span> {user.email}</li>
            <li><span className="font-medium">Phone:</span> {user.phone === "" || !user.phone ? "N/A" : user.phone}</li>
            <li>
              <span className="font-medium">Link: </span> 
              {userLink}
            </li>
          </ul>
        </div>
        <p className="mt-2 text-sm font-light text-right">Here since: {moment(user.createdAt).format("MMMM Do YYYY")}</p>
      </div>
    </>
  )
}
