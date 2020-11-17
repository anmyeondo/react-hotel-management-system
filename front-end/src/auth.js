import axios from "axios";

export default async function signIn({ id, password }) {
  console.log("login start");
  const res = await axios({
    method: "get",
    url: "/users/login",
    params: {
      id: id,
      password: password,
    },
  });
  // 응답 성공
  console.log("응답 성공");

  var data = res.data;
  var ans = data.length;

  if (ans == 0) {
    console.log("no ID");
    return 0;
  } else if (data[0].Staff_Password == password) {
    console.log("correct");
    return 1;
  } else {
    console.log("pw error");
    return 2;
  }
}
