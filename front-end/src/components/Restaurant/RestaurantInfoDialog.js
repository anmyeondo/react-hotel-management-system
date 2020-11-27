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
import CourseDeleteBtn from "./CourseDeleteBtn";
import Grid from "@material-ui/core/Grid";
import RestaurantModifyDialog from "./RestaurantModifyDialog";
import { Refresh } from "@material-ui/icons/Refresh";

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
      modify_ofen: false,
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

  // 수정 Dialog를 변경하는 메소드
  onModifyDialog = () => {
    this.setState({ modify_ofen: true });
  };
  offModifyDialog = () => {
    this.setState({ modify_ofen: false });
  };

  // 코스 페이지 변경 메소드
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };
  handlePageRest = () => {
    this.setState({ page: 0 });
  };

  render() {
    const classes = makeStyles();
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.dialogClose}
        maxWidth={"lg"}
      >
        <DialogTitle>
          {" "}
          <strong>레스토랑 상세정보</strong>
        </DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <img
                    src={this.props.data.Restaurant_Img}
                    style={{ width: "256px", height: "256px", align: "center" }}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="소유 호텔"
                secondary={this.props.data.HOTEL_Name}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="레스토랑명"
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
                    {this.state.course.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          코스 메뉴가 없습니다. 메뉴를 등록해주세요.
                        </TableCell>
                      </TableRow>
                    ) : (
                      this.state.course
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
                                <CourseDeleteBtn
                                  data={c}
                                  getCourse={this.getCourse}
                                  resetPage={this.handlePageRest}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
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
              </Paper>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText primary="식당 내선번호" secondary={5397} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.onModifyDialog}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.dialogClose}
          >
            닫기
          </Button>
        </DialogActions>
        <RestaurantModifyDialog
          data={this.props.data}
          course={this.state.course}
          open={this.state.modify_ofen}
          closeDialog={this.offModifyDialog}
          RefreshTable={this.getCourse}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(RestaurantInfoDialog);
