import LeftSidebar from "../../modules/nextSidebar";
import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  linked: {
    textDecoration: "none",
    color: "white",
  },
});
const logout = async () => {
  await axios({
    method: "get",
    url: "/staffs/sessionLogout",
  });
  document.location.href = "/";
};
function Header(props) {
  useEffect(() => {
    props.checkPermission();
  }, []);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <LeftSidebar />
          <Grid container spacing={1} alignItems="center">
            <a href="/header" className={props.classes.linked}>
              <h2> ADMIN </h2>
            </a>
            <Grid item xs />
            <Grid item>
              <IconButton
                color="inherit"
                className={props.classes.iconButtonAvatar}
              >
                <Avatar
                  src="https://blogfiles.pstatic.net/20150401_109/dakyoung0627_1427817713061tqQlE_JPEG/%B0%B3%B9%CC%B9%E8%C2%AF%C0%CC2.jpg"
                  alt="My Avatar"
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <Button className={props.classes.link} onClick={logout}>
                Logout
              </Button>
            </Grid>
            {/* <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
