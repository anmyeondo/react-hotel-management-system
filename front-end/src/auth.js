import axios from "axios";

export default async function signIn({ id, password }) {
  console.log("로그인 API를 호출합니다");
  const res = await axios({
    method: "get",
    url: "/staffs/login",
    params: {
      id: id,
      password: password,
    },
  });

  // 응답 성공
  console.log("계정 조회 요청이 성공하였습니다");
  const resData = JSON.parse(res.data);
  const errorCode = resData.errorcode;
  const compResult = resData.compResult;

  if (errorCode == 1) {
    // 계정이 존재하지 않는 경우 처리
  } else if (errorCode == 2) {
    // 계정이 존재하는 경우 처리
  } else {
    // 계정이 중복되는 경우 처리
  }
}
