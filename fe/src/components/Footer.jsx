import { Link } from "react-router-dom";

const pages = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  { name: "Adopt", route: "/adopt" },
  { name: "Post", route: "/post" },
]

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 top-100 z-40">
      <div className="bg-secondary grid gap-4 md:grid-flow-col md:justify-between py-4 px-8 text-sm">
        <div className="md:w-2/3">
          <h2 className="font-semibold text-2xl">PetAdopt</h2>
          <p>Integer eu ante quis elit hendrerit dapibus. Praesent elementum convallis finibus. Cras tempus augue eu nunc porta, quis scelerisque dolor dictum.</p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <h2 className="font-semibold mb-1">ORGANIZATION</h2>
            {pages.map((page) => (
              <Link to={page.route} key={page.name} className="text-gray-900 uppercase hover:brightness-110">{page.name}</Link>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-1">LEGAL</h2>
            <h3 className="text-gray-900 uppercase hover:brightness-110">
              User Agreement
            </h3>
            <h3 className="text-gray-900 uppercase hover:brightness-110">
              Privacy
            </h3>
          </div>
        </div>
      </div>
      <div className="py-1 px-4 bg-primary md:flex md:items-center md:justify-between">
        <span className="text-xs sm:text-center">
          © 2024 PetAdopt. All Rights Reserved.
        </span>
        </div>
    </footer>
  )
}
