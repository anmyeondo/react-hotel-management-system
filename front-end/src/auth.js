import axios from "axios";

export default function signIn({ id, password }) {
  console.log("login start");
  axios({
    method: "get",
    url: "/users/login",
    params: {
      id: id,
      password: password,
    },
  })
    .then((res) => {
      // 응답 성공
      console.log("응답 성공");

      var data = res.data;
      var ans = Object.keys(data).length;

      if (ans == 0) {
        console.log("no ID");
        return 0;
      } else if (data[0].phone == password) {
        console.log("correct");
        return 1;
      } else {
        console.log("pw error");
        return 2;
      }
    })
    .catch((error) => {
      // 응답 실패(error)
      console.log("error");
    });
  return false;
}
