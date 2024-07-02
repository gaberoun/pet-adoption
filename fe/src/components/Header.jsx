import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "../context/Context";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Adopt", href: "/adopt" },
  { name: "Post", href: "/post" }
]

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const style = ({isActive}) => {
    return {
      color: isActive ? "2px solid black" : "none"
    }
  }

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="flex items-center justify-between px-3 py-2 shadow rounded-sm bg-white" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <h3 className="font-semibold text-xl">
              Pet Adoption App
            </h3>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.href} 
              className="text-sm uppercase font-medium leading-6 text-gray-900"
              style={style}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button 
            className="block uppercase bg-primary rounded-lg px-2.5 text-sm leading-7 text-white hover:brightness-125"
            onClick={handleClick}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <h3 className="font-semibold text-2xl">
                Pet Adoption App
              </h3>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 uppercase block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-200"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <button 
                  className="w-full uppercase block bg-primary rounded-lg px-3 py-1 text-base leading-7 text-white hover:brightness-75"
                  onClick={handleClick}
                >
                  {isLoggedIn ? "Log out" : "Log in"}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
