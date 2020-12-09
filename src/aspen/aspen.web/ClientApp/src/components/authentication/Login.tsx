import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import theme from "../../theme";
import APIAuthorizationService from "../../services/APIAuthorizationService";
import { LoggerService } from '../../services/LoggerService';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/Authentication/actions";
import { ApplicationState } from "../../store";
import Token from '../../models/TokenModel';
import { RouteComponentProps } from 'react-router';
import { HOME_ROUTE } from "../../constants/RouteConstants";
import { RETURN_URL } from "../../constants/QueryConstants";
import { Charity } from '../../models/CharityModel';



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

interface MyRouteProps {

}

interface LoginProps extends RouteComponentProps<MyRouteProps> {
  token: Token | null,
  charity: Charity | null,
  login: typeof actionCreators.login,
}

const Login: React.FC<LoginProps> = props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [charityId, setCharityId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const returnURL = new URLSearchParams(props.location.search).get(RETURN_URL) || HOME_ROUTE

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    if(props.charity)
    {
      setCharityId(props.charity.ID);
      console.log(charityId);
    }
    
    
  }, [username, password, charityId]);

  const loggerservice = new LoggerService();
  const authservice = new APIAuthorizationService(loggerservice);
  const handleLogin = async () => {
    props.login(username, password, charityId);
    if (props.token) {
      loggerservice.Error(props.token.key)
      localStorage.setItem('KEY', props.token.key);
      setError(false);
      alert('Login Successfully');
      props.history.push(returnURL);
      localStorage.setItem("userName", username )
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

const mapStateToProps = (state: ApplicationState) => {
  return {
    token: state.auth.token,
    charity: state.charity.charity,
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);