import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import theme from "../../theme";
import NavBar from "../NavBar";
import APIAuthorizationService from "../../services/APIAuthorizationService";
import { LoggerService } from '../../services/LoggerService';


const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.light,
      }
    },
    header: {
      textAlign: 'center',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    card: {
      marginTop: theme.spacing(15)
    },
    background: {
      background: "#e5e5e5",
      height: "100vh"
    }
  }),
);

interface LoginProps {

}

const Login: React.FC<LoginProps> = props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const loggerservice = new LoggerService();
  const authservice = new APIAuthorizationService(loggerservice);

  const handleLogin = async () => {
    let token = await authservice.Login(username, password)
    if (token) {
      loggerservice.Error(token.key)
      setError(false);
      alert('Login Successfully');
    } else {
      setError(true);
      setHelperText('Incorrect username or password')
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <React.Fragment>
      <div className={classes.background}>
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Login" />
            <CardContent>
              <div>
                <TextField
                  error={error}
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <TextField
                  error={error}
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  helperText={helperText}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                className={classes.loginBtn}
                onClick={() => handleLogin()}
                disabled={isButtonDisabled}>
                Login
            </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;