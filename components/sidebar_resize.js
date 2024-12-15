  "use client"
  import { MainContent } from "../components/mainContent";
  import Sidebar from "../components/sidebar";
  import { useState, useEffect } from "react";


  export const ParentComponent = () => {
    const [isOpen, setIsOpen] = useState(true); 
    const [isMobile,setIsMobile] = useState(false);
    useEffect(()=>{
      const resize = () =>{
        if (typeof setIsOpen === 'function') {
          if(window.innerWidth <= 1024){
            // setIsMobile(true);
            setIsOpen(false);
          }else{
            // setIsMobile(false);
            setIsOpen(true);
          }
        }
      }
      resize();
      window.addEventListener("resize",resize);
      return() =>window.removeEventListener("resize",resize);
    },[]);
    
    console.log(isOpen);
    // console.log("ParentComponent isOpen:", isOpen);
    
    
    return (
      <div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <MainContent isSidebarOpen={isOpen}/>
      </div>
    );
  };
  