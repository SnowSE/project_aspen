import React from "react";
import {Card, CardActions, CardContent} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./ContentCard.css";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Theme } from "../../models/Theme";

interface ContentCardProps {
  title: string,
  image: string,
  description: string,
  theme: Theme
}

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
      color: props.theme.palette.primary.main,
    },
    buttons:{
      color: props.theme.palette.secondary.main,
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
          Check it out!  Hooray!
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

const mapStateToProps = (state: ApplicationState) => {
  return {
      theme: state.charity.theme
  }
}

export default connect(
  mapStateToProps
)(ContentCard);
