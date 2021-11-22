import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles({
  header: {
    background: "#111111",
  },
  tabs: {
    color: "#FFFFFF",
    textDecoration: "none",
    marginLeft: 50,
    fontSize: 25,
  },
});

const Navbar = () => {
  const classes = useStyle();
  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <NavLink className={classes.tabs} to="/">
          React Redux Contact App
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
