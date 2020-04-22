import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import theme from "../../theme";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    registerBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        background: theme.palette.primary.light
      }
    },
    header: {
      textAlign: "center",
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
  })
);

interface RegisterProps {}

const Register: React.FC<RegisterProps> = props => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [confirmHelperText, setConfirmHelperText] = useState("");
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim() && confirm_password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password, confirm_password]);

  const handleRegister = () => {
    if (username.length > 0 && password === confirm_password) {
      alert("Register Successfully");
    }
    updateErrorValues();
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleRegister();
    }
  };

  const updateErrorValues = () => {
    setConfirmDisplay(password !== confirm_password);
  };

  const updateConfirmPassword = (passwordInput: string) => {
    setConfirmPassword(passwordInput);
    setConfirmDisplay(passwordInput !== password);
  };

  const setConfirmDisplay = (enabled: boolean) => {
    if (enabled) {
      setConfirmError(true);
      setConfirmHelperText(`Passwords don't match`);
    } else {
      setConfirmError(false);
      setConfirmHelperText("");
    }
  };

  return (
    <React.Fragment>
    <div className={classes.background}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Register" />
          <CardContent>
            <div>
              <TextField
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={e => setUsername(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
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
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
              <TextField
                error={confirmError}
                fullWidth
                id="confirm_password"
                type="password"
                label="Confirm Password"
                placeholder="Password"
                margin="normal"
                helperText={confirmHelperText}
                onChange={e => updateConfirmPassword(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              className={classes.registerBtn}
              onClick={() => handleRegister()}
              disabled={isButtonDisabled}
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
