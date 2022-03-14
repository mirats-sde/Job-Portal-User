import React, { useState, useEffect, useContext } from "react";
import { MdWidgets } from "react-icons/md";
import styles from "./navbar2.module.css";
import classNames from "classnames";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
// User Profile
import Box from "@mui/material/Box";
// import Avatar from '@mui/material/Avatar';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, NavLink } from "react-router-dom";
import { AuthenticationContext } from "../../authentication/AuthenticationContext";
import { style } from "@mui/system";

const Navbar2 = () => {
  const [hamburger, sethamburger] = useState(false);
  const [navscroll, setNavscroll] = useState(true);
  const [navcolor, setNavcolor] = useState(false);
  const [logocolor, setLogocolor] = useState(false);
  const [hrLine, setHrLine] = useState(false);
  const [widget, setWidget] = useState(false);

  //Authentication Context
  let { user, LogoutUser } = useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = React.useState(null); //user Avatar
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlesidebar = () => {
    console.log("click");
    sethamburger(!hamburger);
  };

  const overlayhandle = () => {
    sethamburger(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        //  if ( window.scrollY === 100){
        //   setNavcolor("nav_container ")
        //  }
        //   else if ( window.scrollY > 101){
        //     setNavcolor("nav_container white  ")
        //   }
        setNavscroll(false);
      } else {
        setNavscroll(true);
      }
      lastScrollY = window.scrollY;
    });
    window.addEventListener("scroll", () => {
      if (lastScrollY === 0) {
        // setNavcolor("nav_container trasparent")
        setNavcolor(true);
      } else {
        // setNavcolor("nav_container white")
        setNavcolor(false);
      }
    });

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
        {/* Top Bar  */}
        <div
          className={
            navcolor
              ? classNames(styles.home_info, styles.transparent2)
              : classNames(styles.home_info, styles.white2)
          }
        >
          <div className={hrLine ? styles.company_logo : styles.company_logo2}>
            <img
              className={styles.logo_color}
              src="https://www.miratsinsights.com/logo/transparent/white_rect.png"
              alt="mirats.insights"
            />
          </div>
        </div>
        {/* Menu bar  */}
        <div className={styles.navbar}>
          <div className={styles.left}>
            <div className={styles.hamburger}>
              <MdWidgets className={styles.widget} onClick={handlesidebar} />
            </div>
            <div className={styles.brand_name}>
              <h2 className={logocolor ? styles.logo_color : ""}>
                Build your future
              </h2>
            </div>

            <ul className={styles.navlink}>
              <li>
                <NavLink
                  exact={true}
                  to="/"
                  className={classNames(styles.navitem)}
                  // className={({ isActive }) => (isActive ? "" : "navitem")}
                  // className={classNames(
                  //   styles.activewhite,
                  //   logocolor ? "" : styles.navitem
                  // )}
                  activeClassName
                >
                  <div>Home</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/exploreteams"
                  className={({ isActive }) =>
                    isActive ? styles.activewhite3 : styles.navitem
                  }
                  // className={classNames(
                  //   styles.activewhite3,
                  //   logocolor ? styles.navitem : ""
                  // )}
                >
                  <div>Explore Teams</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/students"
                  // className={classNames("navitem")}
                  className={({ isActive }) =>
                    isActive ? styles.activewhite3 : styles.navitem
                  }
                  // className={classNames(
                  //   styles.navitem,
                  //   logocolor ? styles.logo_color : ""
                  // )}
                >
                  <div>Students</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/jobs"
                  activeClassName
                  // className={classNames("navitem")}
                  className={({ isActive }) =>
                    isActive ? styles.activewhite3 : styles.navitem
                  }
                  // className={classNames(
                  //   styles.navitem,
                  //   logocolor ? styles.logo_color : ""
                  // )}
                >
                  <div>Jobs</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName
                  to="/programs"
                  exact
                  // className={classNames("navitem")}
                  className={({ isActive }) =>
                    isActive ? styles.activewhite3 : styles.navitem
                  }
                  // className={classNames(
                  //   styles.navitem,
                  //   logocolor ? styles.logo_color : ""
                  // )}
                >
                  <div>Programs</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/resources"
                  activeClassName
                  // className={classNames("navitem")}
                  className={({ isActive }) =>
                    isActive ? styles.activewhite3 : styles.navitem
                  }
                  // className={classNames(
                  //   styles.navitem,
                  //   logocolor ? styles.logo_color : ""
                  // )}
                >
                  <div>Resources</div>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.right}>
            <ul>
              <li>
                {/* User Profile  */}
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        {user ? (
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: deepOrange[500],
                            }}
                          >
                            {user?.email[0].toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {user ? (
                    // If User then show Logout and Profile
                    <Menu
                      elevation={16}
                      // style={{ zIndex: 1999999999, position: "relative" }}
                      className={classNames(styles.profile_menu)}
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 199999,
                        sx: {
                          overflow: "visible",
                          // backgroundColor: "red",

                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 199999999999999,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Tooltip title="Open Profile" followCursor>
                          <Link
                            to="/userprofile"
                            style={{
                              textDecoration: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar /> {user?.email}
                          </Link>
                        </Tooltip>
                      </MenuItem>

                      {/* <MenuItem>
                        <Link
                          to="/"
                          style={{
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar /> Profile
                        </Link>
                      </MenuItem> */}

                      <MenuItem>
                        <div className={styles.menu_item} onClick={LogoutUser}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </div>
                      </MenuItem>
                    </Menu>
                  ) : (
                    // If Not User then show Register and Login
                    <Menu
                      anchorEl={anchorEl}
                      className={styles.profile_menu}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 199999,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 1999999,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        {/* <Avatar /> */}
                        <Link
                          to={{ pathname: "/login" }}
                          className={styles.link}
                        >
                          Login
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={{ pathname: "/register/email" }}
                          className={styles.link}
                        >
                          Register
                        </Link>
                      </MenuItem>
                    </Menu>
                  )}
                </React.Fragment>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          hamburger
            ? classNames(styles.sidebar1, styles.animation)
            : classNames(styles.sidebar, styles.animation2)
        }
      >
        <h1>
          <span>Mirats</span> Insights
        </h1>

        {/* <hr className="horizontal_line" /> */}

        <h2>Build your future</h2>
        {/* <hr className="horizontal_line" /> */}

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

export default Navbar2;
