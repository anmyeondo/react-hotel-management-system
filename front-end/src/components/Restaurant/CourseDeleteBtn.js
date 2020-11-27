import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

class CourseDeleteBtn extends React.Component {
  deleteCourse = async (data) => {
    await axios({
      method: "post",
      url: "/facility/delCourse",
      data: {
        Hotel_ID: this.props.data.Hotel_ID,
        Restaurant_Name: this.props.data.Restaurant_Name,
        Course_Name: this.props.data.Course_Name,
      },
    }).then(async () => {
      await this.props.getCourse();
      await this.props.resetPage();
    });
  };

  render() {
    return (
      <Button
        onClick={(e) => {
          this.deleteCourse(this.props.data);
        }}
        color="secondary"
        variant="contained"
      >
        삭제
      </Button>
    );
  }
}

export default CourseDeleteBtn;
