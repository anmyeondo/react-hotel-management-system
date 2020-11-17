import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddBox from "@material-ui/icons/AddBox";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Person from "@material-ui/icons/Person";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import RoomService from "@material-ui/icons/RoomService";
import EventAvailable from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    // 상,하 Drawer에서 사용
    width: "auto",
  },
});

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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* 직원 관리 버튼 */}
        <ListItem
          button
          key="staffManagement"
          onClick={() => {
            document.location.href = "/staff";
          }}
        >
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={"Staff Management"} />
        </ListItem>
        {/* 고객 관리 버튼 */}
        <ListItem
          button
          key="customerManagement"
          onClick={() => {
            // 눌렀을 때 이동할 주소 수정하려면 아래 라우트 수정
            document.location.href = "/staff";
          }}
        >
          <ListItemIcon>
            {/* 아이콘 변경할거면 아래 수정 */}
            <Person />
          </ListItemIcon>
          {/* 박스 안 내용물 수정할거면 여기 수정 */}
          <ListItemText primary={"Customer Management"} />
        </ListItem>
        {/* 예약 관리 버튼 */}
        <ListItem
          button
          key="reservationManagement"
          onClick={() => {
            document.location.href = "/staff";
          }}
        >
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary={"Reservation Management"} />
        </ListItem>
        {/* 방 관리 버튼 */}
        <ListItem
          button
          key="roomManagement"
          onClick={() => {
            document.location.href = "/staff";
          }}
        >
          <ListItemIcon>
            <MeetingRoom />
          </ListItemIcon>
          <ListItemText primary={"Room Management"} />
        </ListItem>
        {/* 주문 관리 버튼 */}
        <ListItem
          button
          key="orderManagement"
          onClick={() => {
            document.location.href = "/staff";
          }}
        >
          <ListItemIcon>
            <RoomService />
          </ListItemIcon>
          <ListItemText primary={"Order Management"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={state.anchor}>
        <Button
          onClick={toggleDrawer(state.anchor, true)}
          startIcon={<AddBox />}
          color="inherit"
          size="large"
        ></Button>
        <Drawer
          anchor={state.anchor}
          open={state[state.anchor]}
          onClose={toggleDrawer(state.anchor, false)}
        >
          {list(state.anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
