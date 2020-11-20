import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import signIn from "../../modules/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Reference © "}
      <Link
        color="inherit"
        href="https://github.com/anmyeondo/react-hotel-management-system"
      >
        Our Github Page
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://cf.bstatic.com/images/hotel/max1024x768/218/218319706.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function LogIn({checkLogined}) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const login = ({ id, password }) => setUser(signIn({ id, password }));
  const [islogin] = useState(false);
  const handleClick = async () => {
    try {
      let resData = await signIn({ id, password });
      const errorCode = resData.e;
      const compResult = resData.cr;

      console.log(errorCode);
      console.log(compResult);

      if (errorCode === 1) {
        alert("계정이 존재하지 않습니다. 아이디를 확인해주세요.");
      } else if (errorCode === 2) {
        if (compResult) {
          setTimeout(() => {
            alert("로그인에 성공하였습니다.");
            // 여기부분 /header 대신 /main이나 그런 페이지 만들어서 이동해야 할듯
            document.location.href = "/header";
          }, 1000);
        } else {
          alert("로그인에 실패하였습니다. 비밀번호를 확인해주세요.");
        }
      } else {
        alert("계정이 중복되었습니다. 관리자에게 문의하세요.");
      }
    } catch (e) {
      alert("로그인에 실패하였습니다 : " + e);
    }
  };

  useEffect(() => {
      checkLogined()
  },[])

  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
      handleClick();
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            비비디바비디부 관리자 로그인
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="Employee ID"
              name="id"
              autoComplete="id"
              autoFocus
              onChange={({ target: { value } }) => setId(value)}
              onKeyPress={onKeyPress}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({ target: { value } }) => setPassword(value)}
              onKeyPress={onKeyPress}
            />
            <Button
              onClick={handleClick}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
