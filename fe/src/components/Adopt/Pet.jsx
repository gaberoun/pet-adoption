import { Link } from "react-router-dom";

export default function Pet({ petId, name, imageUrl }) {
  return (
    <Link to={`/adopt/${petId}`} className="group relative rounded-md bg-container shadow-md hover:translate-y-1">
      <img className="aspect-square h-auto w-full object-cover object-center rounded-t-md" src={imageUrl} alt={name} />
      <p className="p-2 text-sm font-medium capitalize">{name}</p>
    </Link>
  );
};
