import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Test from './Test';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Stafftest from './stafftest'
import axios from 'axios'

const lightColor = 'rgba(255, 255, 255, 0.7)';
const styles = theme => ({
  root: {
  width: "100%",
  marginTop: theme.spacing.unit * 3,
  overflowX: "auto"
  },
  table: {
  minWidth: 1080
  }
});

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.callApi = this.callApi.bind(this);
    this.state = {
      customers: [],
    }
  }

  componentDidMount() {
    this.callApi();
  }
  
  callApi = async () => {
    let response = await axios({
      method: "get",
      url: "/staffs/informs",
    });
    console.log(response.data);
    this.setState({customers: response.data});
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header idx={0}/>
        <Test/>;
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>호텔</TableCell>
                <TableCell>부서</TableCell>
                <TableCell>정보</TableCell>
                <TableCell>등급</TableCell>
                <TableCell>은행</TableCell>
                <TableCell>계좌</TableCell>
                <TableCell>월급</TableCell>
                <TableCell>등록일자</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>

              {this.state.customers.map(c => {
                return <Stafftest key={c.ID} Hotel_ID={c.Hotel_ID} Code={c.Code} Inform_ID={c.Inform_ID} Rank={c.Rank} Bank={c.Bank} Account={c.Account} Salary={c.Salary} RegDate={c.RegDate}  />
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Employee);