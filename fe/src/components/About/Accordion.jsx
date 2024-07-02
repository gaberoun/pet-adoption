export default function Accordion(props) { 
  return (
    <div className="border bg-stone-100 border-stone-200 mb-1">
      <button
        className="w-full p-4 text-left bg-stone-200 hover:brightness-75 transition duration-300"
        onClick={props.toggleAccordion} 
      > 
        {props.title} 
        <span className={`float-right transform ${props.isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span> 
      </button> 
      {props.isOpen && ( 
        <div className="p-4"> 
          {props.data} 
        </div> 
      )} 
    </div> 
  ) 
}
