import React from "react";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

const Header = ({handleToggleSidebar}) => {
  return (
    <div className="header">
      <FaBars className="header_menu" size={26} 
        onClick={() =>  handleToggleSidebar()}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header_logo"
      />
      <form>
            <input
               type='text'
               placeholder='Search'
               
               
            />
            <button type='submit'>
               <AiOutlineSearch size={22} />
            </button>
         </form>

         <div className='header_icons'>
            <MdNotifications size={28} />
            <MdApps size={28} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GNdfefPfPYzh0VvZB3WUDPk8x07-oC-a0A&usqp=CAU" alt='avatar' />
         </div>
    </div>
  );
};

export default Header;
