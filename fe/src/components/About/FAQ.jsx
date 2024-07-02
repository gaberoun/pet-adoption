import { useState } from "react";
import Accordion from "./Accordion";

export default function FAQ() {
  const [accordions, setAccordion] = useState([ 
    { 
      key: 1, 
      title: "How can I adopt?", 
      data: "You can browse different animals for adoption posted by other users. You would be able to reach out to them and they will be responsible for their own adoption process", 
      isOpen: true
    }, 
    { 
      key: 2, 
      title: "Can I post my own pet?", 
      data: "You can post your own pet but make sure that you are sure they are good for adoption.", 
      isOpen: false
    }, 
    { 
      key: 3, 
      title: "Is there a fee to using this app", 
      data: "This app is free to use to encourage people to adopt without having financial worries.", 
      isOpen: false
    }, 
  ]); 

  const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = accordions.map((accord) => { 
      if (accord.key === accordionkey) { 
        return { ...accord, isOpen: !accord.isOpen }; 
      } else { 
        return { ...accord, isOpen: false }; 
      } 
    }); 
    setAccordion(updatedAccordions); 
  }; 

  return (
    <div id="faq" className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
      <a name="faq" className="text-3xl font-bold tracking-tight">Frequently Asked Questions</a>
      <div className="mx-auto mt-10 lg:mx-0 lg:max-w-none">
        {accordions.map((accordion) => ( 
          <Accordion 
            key={accordion.key} 
            title={accordion.title} 
            data={accordion.data} 
            isOpen={accordion.isOpen} 
            toggleAccordion={() => toggleAccordion(accordion.key)} 
          /> 
        ))}
      </div>
    </div>
  )
}
