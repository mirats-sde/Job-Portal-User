import React, { useState, useEffect } from "react";
import { MdWidgets } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import classNames from "classnames";
const Navbar = () => {
  const [hamburger, sethamburger] = useState(false);
  const [navscroll, setNavscroll] = useState(true);
  const [navcolor, setNavcolor] = useState(true); //True: transparent, false: white
  console.log(navcolor);
  const [logocolor, setLogocolor] = useState(false);
  const [hrLine, setHrLine] = useState(false);
  const [widget, setWidget] = useState(false);

  const handlesidebar = () => {
    // console.log("click");
    sethamburger(!hamburger);
  };

  console.log(hamburger);

  const overlayhandle = () => {
    sethamburger(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // Hide and show navbar
    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        setNavscroll(false);
      } else {
        setNavscroll(true);
      }
      lastScrollY = window.scrollY;
    });

    //Navbar color (Transparent and white)
    window.addEventListener("scroll", () => {
      if (lastScrollY === 0) {
        // setNavcolor("nav_container trasparent")
        setNavcolor(true);
      } else {
        // setNavcolor("nav_container white")
        setNavcolor(false);
      }
    });

    //For changing all logo color , Build your future, Hamburger
    window.addEventListener("scroll", () => {
      if (lastScrollY > 0) {
        setLogocolor(true);
        setHrLine(true);
        setWidget(true);
      } else {
        setLogocolor(false);
        setHrLine(false);
        setWidget(false);
      }
    });
  });

  return (
    <>
      <div className={navscroll ? styles.nav_container : styles.hide_navbar}>
        <div
          className={
            navcolor
              ? classNames(styles.home_info, styles.transparent)
              : classNames(styles.home_info, styles.white)
          }
        >
          <div className={hrLine ? styles.company_logo : styles.company_logo2}>
            <img
              className={logocolor && styles.logo_color}
              src="https://www.miratsinsights.com/logo/transparent/white_rect.png"
              alt="mirats.insights"
            />
          </div>
        </div>

        <div
          className={classNames(
            styles.navbar,
            navcolor ? styles.transparent : styles.white
          )}
        >
          <div className={styles.hamburger}>
            <MdWidgets
              className={widget ? styles.widget2 : styles.widget}
              onClick={handlesidebar}
            />
          </div>
          <div className={styles.brand_name}>
            <h2 className={logocolor ? styles.logo_color : ""}>
              Build your future
            </h2>
          </div>

          {/* Nav Items for Desktop starts here  */}
          <ul className={styles.navlink}>
            <li>
              <NavLink
                exact={true}
                to="/"
                // className={ classNames('navitem')}
                // className={({ isActive }) =>
                //   (isActive ? styles.activewhite : styles.navitem)
                // }
                // activeClassName
                className={classNames(
                  styles.navitem,
                  styles.activewhite,
                  logocolor ? styles.logo_color : ""
                )}
              >
                <div>Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/exploreteams"
                activeClassName
                // className={styles.navitem}
                className={classNames(
                  styles.navitem,
                  logocolor ? styles.logo_color : ""
                )}
                // className={({ isActive }) => (isActive ? "active " : "navitem")}
              >
                <div>Explore Teams</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/students"
                activeClassName
                // className={styles.navitem}
                className={classNames(
                  styles.navitem,
                  logocolor ? styles.logo_color : ""
                )}

                // className={({ isActive }) => (isActive ? "active" : "navitem")}
              >
                <div>Students</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/jobs"
                activeClassName
                // className={styles.navitem}
                className={classNames(
                  styles.navitem,
                  logocolor ? styles.logo_color : ""
                )}

                // className={({ isActive }) => (isActive ? "active" : "navitem")}
              >
                <div>Jobs</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName
                to="/programs"
                exact
                // className={styles.navitem}
                className={classNames(
                  styles.navitem,
                  logocolor ? styles.logo_color : ""
                )}

                // className={({ isActive }) => (isActive ? "active" : "navitem")}
              >
                <div>Programs</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/resources"
                activeClassName
                // className={styles.navitem}
                className={classNames(
                  styles.navitem,
                  logocolor ? styles.logo_color : ""
                )}

                // className={({ isActive }) => (isActive ? "active" : "navitem")}
              >
                <div>Resources</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar container  */}
      <div
        className={
          hamburger
            ? classNames(styles.sidebar1, styles.animation)
            : classNames(styles.sidebar, styles.animation1)
        }
      >
        <h1>
          <span>Mirats</span> Insights
        </h1>

        <h2>Build your future</h2>

        {/* Nav Items for Sidebar starts here  */}
        <div className={styles.sidebar_menu}>
          <ul>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                to="/exploreteams"
              >
                Explore Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                to="/students"
              >
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                to="/jobs"
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                to="/programs"
              >
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.navlink_sidebar}
                onClick={handlesidebar}
                to="/resources"
              >
                Resources
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        onClick={overlayhandle}
        className={hamburger ? styles.overlay : styles.overlay2}
      ></div>
    </>
  );
};

export default Navbar;
