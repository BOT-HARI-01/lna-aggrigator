"use client"
import { useState } from "react";
import Link from "next/link";
import Styles from "@/components/sidebar.module.css";

const Sidebar = () => {
  const [isOpen,setIsOpen] = useState(true);
  return (
    <div className={isOpen ? Styles.sidebar : Styles.SidebarClosed}>
      <button onClick={() =>setIsOpen(!isOpen)} className={Styles.toggleButton}></button>
      <ul className={Styles.navList}>
        <li><Link href="/">
          <i className="fa fa-home" aria-hidden="true"></i>
          <span className={Styles.linkText}> Home</span>
          </Link>
        </li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
