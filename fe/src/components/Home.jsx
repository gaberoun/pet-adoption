import { ArrowRightIcon }from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="grid md:grid-cols-5 mb-10 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-5xl mb-4 font-medium">Encouraging positive change</h1>
          <p className="mb-8">Vivamus lorem velit, suscipit eget facilisis vitae, condimentum ut metus. Curabitur placerat urna tellus, a maximus ipsum laoreet et. Ut sagittis eu risus non rhoncus. Curabitur bibendum auctor metus, quis cursus tellus congue finibus. Donec non imperdiet felis. Sed sed consectetur mauris. Quisque volutpat vel lorem non hendrerit.</p>
          <Link to="/adopt" className="uppercase bg-primary px-3 py-1.5 text-sm font-medium text-white leading-6 rounded-md hover:brightness-75">
            Get Started
          </Link>
          <Link to="/about" className="ml-4 uppercase border hover-bg-secondary border-black px-3 py-1.5 text-sm font-medium leading-6 rounded-md">
            Learn More
            <ArrowRightIcon className="h-4 w-4 inline" />
          </Link>
        </div>
        <img src="https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/07/Stray-Kittens-scaled.jpg" id="hero-image" className="md:col-span-3 object-cover" />
      </div>

      <div className="rounded-md bg-container p-4 my-10 md:w-2/3 mx-auto">
        <h2 className="text-center text-xl">Donate for animals in need</h2>
        <p className="text-sm">Proin vitae neque pellentesque, ornare lacus id, pretium tortor. Quisque pellentesque ligula id malesuada molestie. Duis nec velit tincidunt, ullamcorper sapien a, elementum purus. Sed vehicula ipsum non pulvinar porta.</p>
        <button className="mt-4 mx-auto flex gap-1 items-center uppercase bg-accent hover:brightness-75 px-3 py-1.5 text-sm leading-6 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          Donate Now
        </button>
      </div>

      <figure className="text-center">
        <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <blockquote>
          <p className="text-2xl italic font-medium text-gray-900">"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas nisi magna, tempor sit amet euismod eget, hendrerit nec dui. Integer imperdiet purus a augue porttitor, a feugiat mauris congue. Sed hendrerit est ut accumsan venenatis."</p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
            <cite className="pe-3 font-medium text-gray-900">Rice Ganda</cite>
            <cite className="ps-3 text-sm text-gray-500">Proud Owner of Brownie</cite>
          </div>
        </figcaption>
      </figure>
    </>
  )
}
