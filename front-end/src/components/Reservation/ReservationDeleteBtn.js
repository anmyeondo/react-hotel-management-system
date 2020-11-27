import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class ReservationDeleteBtn extends React.Component {

    deleteReservation = async (reservationID) =>{
        await axios ({
            method: "get",
            url: "/reservations/del",
            params: {
                reservationID: reservationID,
            }
        }).then(() => {
            this.props.refreshTable();
        });
    }

    render() {
        return (
            <Button onClick={(e) => {this.deleteReservation(this.props.reservationID)}} color="secondary" variant="contained" >삭제</Button>
        )
    }
}

export default ReservationDeleteBtn;