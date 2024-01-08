import React from "react";
import logo from "./../assets/logo.png";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faEye } from "@fortawesome/free-regular-svg-icons";

function Header() {
  return (
    <>
      <nav className='w-full md:w-11/12 m-auto flex justify-between items-center md:my-5 mb-2 p-5 rounded-lg bg-white'>
        <NavLink to='/' className='flex items-center'>
          <FontAwesomeIcon icon={faLink} size='xl' color='#613cfc' />
          <p className='hidden md:block text-bold ml-2'>devlinks</p>
        </NavLink>
        <div className='flex items-center justify-between w-1/5'>
          <NavLink
            to='/'
            className={({ isActive, isPending }) =>
              isPending
                ? "font-semibold"
                : isActive
                ? "bg-[#d4cbf8] text-[#613cfc] font-semibold px-3 py-2 rounded-lg mr-2 flex items-center"
                : "flex items-center"
            }>
            <FontAwesomeIcon icon={faLink} size='lg' />
            <p className='hidden md:block ml-2'>Links</p>
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive, isPending }) =>
              isPending
                ? "font-semibold"
                : isActive
                ? "bg-[#d4cbf8] text-[#613cfc] font-semibold px-3 py-2 rounded-lg ml-4 flex items-center"
                : "flex items-center"
            }>
            <FontAwesomeIcon icon={faCircleUser} size='lg' />
            <p className='hidden md:block ml-2'>Profile Details</p>
          </NavLink>
        </div>
        <NavLink
          to='/'
          className='flex items-center text-bold text-[#613cfc] outline outline-[#613cfc] px-4 py-2 rounded-md'>
          <FontAwesomeIcon icon={faEye} />
          <div className='hidden md:block ml-2'> Preview </div>
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
