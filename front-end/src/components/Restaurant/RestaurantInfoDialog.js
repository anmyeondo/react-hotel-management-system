import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },

  hidden: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  rootpaper: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 800,
    border: "3px solid black",
  },
  tablecelling: {
    align: "center",
  },
}));

class RestaurantInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info_open: false,
      course: [],
      page: 0,
      rowsPerPage: 2,
    };
  }

  componentDidMount = () => {
    this.getCourse();
  };

  // DB에서 해당 레스토랑의 코스들을 가져오는 메소드
  getCourse = () => {
    axios({
      method: "post",
      url: "/facility/getCourse",
      data: {
        Hotel_ID: this.props.data.Hotel_ID,
        Restaurant_Name: this.props.data.Restaurant_Name,
      },
    }).then((res) => {
      this.setState({ course: res.data });
    });
  };

  // 코스 삭제
  deleteCourse = () => {
    console.log("삭제");
    axios({
      method: "post",
      url: "/facility/delCourse",
      data: {
        Hotel_ID: 1,
        Restaurant_Name: "1234",
      },
    });
  };
  // 종료 시 창 닫기
  closeDialog = () => {
    this.props.dialogClose();
  };

  // 코스 페이지 변경 메소드
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose} maxWidth={"lg"}>
        <DialogTitle>
          {" "}
          <strong>레스토랑 상세정보</strong>
        </DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem>
              <img
                src={this.props.data.Restaurant_Img}
                style={{ width: "128px", height: "128px" }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="소유 호텔"
                secondary={this.props.data.HOTEL_Name}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="가게명"
                secondary={this.props.data.Restaurant_Name}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="영업시간"
                secondary={
                  this.props.data.Open_Time + " ~ " + this.props.data.Close_Time
                }
              />
            </ListItem>
            <ListItem>
              <Paper className={classes.rootpaper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.table}>
                      <TableCell className={classes.tablecelling}>
                        코스
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        가격
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        에피타이저
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        메인 1
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        메인 2
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        디저트
                      </TableCell>
                      <TableCell className={classes.tablecelling}>
                        삭제
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.course
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((c) => {
                        return (
                          <TableRow>
                            <TableCell className={classes.tablecelling}>
                              {c.Course_Name}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              {c.Price_Won}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              {c.Appetizer}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              {c.Main1}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              {c.Main2}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              {c.Dessert}
                            </TableCell>
                            <TableCell className={classes.tablecelling}>
                              <Button
                                onclick={this.deleteCourse}
                                color="secondary"
                                variant="contained"
                              >
                                삭제
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <TablePagination
                    rowsPerPageOptions={[2]}
                    component="div"
                    count={this.state.course.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    className={classes.table}
                  />
                </Table>
              </Paper>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="영업시간"
                secondary={
                  this.props.data.Open_Time + " ~ " + this.props.data.Close_Time
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.dialogClose}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RestaurantInfoDialog);
