import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
