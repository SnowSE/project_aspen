import * as React from "react";
import Description from "./Description";
import ProgressCircle from "./ProgressCircle";
import RankingCard from "./RankingCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  description: {
    width: "100%",
  },
  stats: {
    display: "flex",
    alignContent: "space-between",
    width: "100%",
    maxHeight: 300
  },
  progressCircle: {
    flexGrow: 1,
    margin: 10
  },
  rankingCard: {
    flexGrow: 3,
    margin: 10,
    overflow: 'show',
    height: '100%'
  }
});

interface TeamPageProps {}

const TeamPage: React.FC<TeamPageProps> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.description}>
        <Description />
      </div>
      <div className={classes.stats}>
        <div className={classes.progressCircle}>
          <ProgressCircle />
        </div>
        <div className={classes.rankingCard}>
          <RankingCard />
        </div>
        <div className={classes.progressCircle}>
          <ProgressCircle />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamPage;
