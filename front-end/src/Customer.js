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
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Stafftest from './stafftest'

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
  
const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/48/48/1',
  'name': '엄태호',
  'birthday': '961222',
  'gender': '남자',
  'job': '응원단장'
  },
  {
  'id': 2,
  'image': 'https://placeimg.com/48/48/2',
  'name': '김승현',
  'birthday': '960508',
  'gender': '남자',
  'job': '백엔드'
  },
  {
  'id': 3,
  'image': 'https://placeimg.com/48/48/3',
  'name': '김재훈',
  'birthday': '961127',
  'gender': '남자',
  'job': '프론트'
  }
]
  
class Customer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header idx={1}/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {customers.map(c => {
              return <Stafftest key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Customer);