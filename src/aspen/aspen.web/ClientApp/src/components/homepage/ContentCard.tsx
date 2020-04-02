import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardActions, CardContent} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./ContentCard.css"
import * as ThemeStore from "../../store/Theme";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

interface ContentCardInterface {
  title: string,
  image: string,
  description: string
}

type ContentCardProps = ThemeStore.ThemeState & typeof ThemeStore.actionCreators & ContentCardInterface;

const ContentCard:React.FC<ContentCardProps> = props => {
  const classes = {
    root: {
      margin: 20,
      minHeight: 565
    },
    media: {
      height: 300,
    },
    title:{
      color: props.palette.primary.main,
    },
    buttons:{
      color: props.palette.secondary.main,
    }
  }
  return (
    <Card style={classes.root}>
      <CardActionArea>
        <CardMedia
          style={classes.media}
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={classes.title}>
          {props.title}
          </Typography>
          <div color="textSecondary" className="description">
            {props.description}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style={classes.buttons}>
          Share
        </Button>
        <Button size="small" style={classes.buttons}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect(
  (state: ApplicationState) => state.theme,
  dispatch => bindActionCreators(ThemeStore.actionCreators, dispatch)
)(ContentCard);
