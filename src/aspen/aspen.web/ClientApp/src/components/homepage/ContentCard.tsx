import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardActions, CardContent} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./ContentCard.css"
import theme from "../../theme";

const useStyles = makeStyles({
  root: {
    margin: 20,
    minHeight: 565
  },
  media: {
    height: 300,
  },
  title:{
    color: theme.palette.primary.main,
  },
  buttons:{
    color: theme.palette.secondary.main,
  }
  
});

interface ContentCardProps {
  title: string,
  image: string,
  description: string
}

const ContentCard:React.FC<ContentCardProps> = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {props.title}
          </Typography>
          <div color="textSecondary" className="description">
            {props.description}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.buttons}>
          Share
        </Button>
        <Button size="small" className={classes.buttons}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContentCard;
