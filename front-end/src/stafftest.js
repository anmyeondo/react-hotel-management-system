import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StaffDelete from './StaffDelete'

class stafftest extends React.Component {
    constructor(props) {
        super(props);
    }
    // <TableCell><img src={this.props.Code} alt="profile"/></TableCell>
    render() {
        return (
        <TableRow>
            <TableCell>{this.props.Hotel_ID}</TableCell>
            <TableCell>{this.props.Code}</TableCell>
            <TableCell>{this.props.Inform_ID}</TableCell>
            <TableCell>{this.props.Rank}</TableCell>
            <TableCell>{this.props.Bank}</TableCell>
            <TableCell>{this.props.Account}</TableCell>
            <TableCell>{this.props.Salary}</TableCell>
            <TableCell>{this.props.RegDate}</TableCell>
            <TableCell align='center'><StaffDelete stateRefresh={this.props.stateRefresh} ID={this.props.ID}/></TableCell>
        </TableRow>
        )
    }
}

export default stafftest;

