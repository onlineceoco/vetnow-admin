import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { logout } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuWrapper: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "row",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        Vetna
      </div>
      <Divider />
      <List>
        <NavLink style={{ color: "rgba(0, 0, 0, 0.54)" }} to="/products">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="محصولات" />
          </ListItem>
        </NavLink>
        <NavLink style={{ color: "rgba(0, 0, 0, 0.54)" }} to="/comments">
          <ListItem button>
            <ListItemIcon>
              <ChatBubbleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="کامنت ها" />
          </ListItem>
        </NavLink>
        <NavLink style={{ color: "rgba(0, 0, 0, 0.54)" }} to="/users">
          <ListItem button>
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="کاربران" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item md={11} xs={9} className={classes.menuWrapper}>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>

              <Typography variant="h6" noWrap>
                <Link to="/" style={{ color: "#fff" }}>
                  پنل ادمین
                </Link>
              </Typography>
            </Grid>
            <Grid item md={1} xs={3}>
              <Button
                onClick={handleLogout}
                color="inherit"
                style={{ fontSize: "1rem" }}
              >
                خروج
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
