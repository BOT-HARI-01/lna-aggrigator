"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "@/components/sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile,setIsMobile] = useState(false);
  useEffect(()=>{
    const resize = () =>{
      if(window.innerWidth <= 768){
        setIsMobile(true);
        setIsOpen(false);
      }else{
        setIsMobile(false);
        setIsOpen(true);
      }  
    }
    resize();
    window.addEventListener("resize",resize);
    return() =>window.removeEventListener("resize",resize);
  },[]);
  return (
    <div className={isOpen ? Styles.sidebar : Styles.sidebarClosed}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        {isOpen ? "<" : ">"}
      </button>
      <ul className={Styles.navList}>
        <li>
          <Link href="/">
            <i className="fa fa-home" aria-hidden="true"></i>
            {isOpen && <span className={Styles.linkText}>Home</span>}
          </Link>
        </li>
        <li>
          <Link href="/about">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            {isOpen && <span className={Styles.linkText}>About</span>}
          </Link>
        </li>
        <li>
          <Link href="/services">
            <i className="fa fa-cogs" aria-hidden="true"></i>
            {isOpen && <span className={Styles.linkText}>Services</span>}
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            {isOpen && <span className={Styles.linkText}>Contact</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
