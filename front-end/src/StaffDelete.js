import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
class StaffDelete extends React.Component {

deleteStaff(id){
    console.log("deleting");
    axios ({
        method: "get",
        url: "/staffs/del",
        params: {
            id: id,
        }
    })
}

render() {
    return (
        <Button onClick={(e) => {this.deleteStaff(this.props.id)}} color="secondary" variant="contained" >삭제</Button>
    )
    }
}

export default StaffDelete;