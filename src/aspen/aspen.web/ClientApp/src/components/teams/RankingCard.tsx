import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  card: {
    backgroundColor: "green"
  },
  typography: {
    color: "white"
  }
});

interface RankingCardProps {}

const RankingCard: React.FC<RankingCardProps> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography component="div" className={classes.typography}>
            <Box fontSize="h4.fontSize" textAlign="center" m={1}>
              Your Ranking:
            </Box>
            <Box
              fontSize="h1.fontSize"
              fontWeight="700"
              textAlign="center"
              m={1}
            >
              # 1
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default RankingCard;
