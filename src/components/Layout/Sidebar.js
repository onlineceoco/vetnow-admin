import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { IoBagAddSharp } from "react-icons/io5";

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>LOGO</div>
      <ul className={classes.navList}>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeLink}
          to="/products"
        >
          <span>
            <IoBagAddSharp className={classes.navIcons} />
          </span>
          Products
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeLink}  
          to="/s"
        >
          <span>
            <IoBagAddSharp className={classes.navIcons} />
          </span>
          Hello
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeLink}
          to="/ss"
        >
          <span>
            <IoBagAddSharp className={classes.navIcons} />
          </span>
          Hello
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
