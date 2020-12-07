import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ListIcon from "@material-ui/icons/List";
import { Link } from "react-router-dom";
import {
  AssignmentInd,
  Person,
  MeetingRoom,
  EventAvailable,
  RoomService,
  Business,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    // 상,하 Drawer에서 사용
    width: "auto",
  },
});

const StyledListItemHeader = withStyles({
  root: {
    backgroundColor: "#C0C0C0",
    textAlign: "center",
  },
})(ListItem);
const StyledList = withStyles({
  root: {
    position: "absolute",
    bottom: 0,
  },
})(List);
const StyledButton = withStyles({
  root: {
    color: "white",
  },
})(IconButton);
const StyledListIcon = withStyles({
  root: {
    width: 40,
    height: 40,
  },
})(ListIcon);

// 왼쪽 사이드바 module
export default function LeftSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    anchor: "left",
  });

  // 상,하 Drawer에서 적용
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // 컨텐츠
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ height: "100%" }}
    >
      <List>
        <StyledListItemHeader>
          <ListItemText primary="Personnel Management"></ListItemText>
        </StyledListItemHeader>

        <ListItem button component={Link} to="/staff">
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={"Staffs"} />
        </ListItem>

        <ListItem button component={Link} to="/customer">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={"Customers"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <StyledListItemHeader>
          <ListItemText primary="Service Management"></ListItemText>
        </StyledListItemHeader>

        <ListItem button component={Link} to="/reservation">
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary={"Reservations"} />
        </ListItem>
        <ListItem button component={Link} to="/order">
          <ListItemIcon>
            <RoomService />
          </ListItemIcon>
          <ListItemText primary={"Orders"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <StyledListItemHeader>
          <ListItemText primary="Facility Management"></ListItemText>
        </StyledListItemHeader>

        <ListItem button component={Link} to="/room">
          <ListItemIcon>
            <MeetingRoom />
          </ListItemIcon>
          <ListItemText primary={"Room"} />
        </ListItem>
        <ListItem button component={Link} to="/restaurant">
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary={"Restaurant"} />
        </ListItem>
        <ListItem button component={Link} to="/parking_lot">
          <ListItemIcon>
            <LocalParkingIcon />
          </ListItemIcon>
          <ListItemText primary={"Parking Lot"} />
        </ListItem>
      </List>
      <StyledList>
        <ListItem button component={Link} to="/header">
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </StyledList>
    </div>
  );

  const anchor = "left";
  return (
    <React.Fragment key={anchor}>
      <StyledButton onClick={toggleDrawer(anchor, true)}>
        <StyledListIcon />
      </StyledButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        containerStyle={{ height: "100%" }}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
