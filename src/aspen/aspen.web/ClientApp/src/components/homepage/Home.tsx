import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import ContentCard from "./ContentCard";
import Rankings from "./Rankings";
import Grid from "@material-ui/core/Grid";
import { ApplicationState } from "../../store";
import { Charity } from "../../models/CharityModel";

interface HomeProps {
  charity: Charity | null
}

const Home: React.FC<HomeProps> = props => {
  return (
    <React.Fragment>
      <Header
        greeting={props.charity === null ? "Loading..." : props.charity.CharityName}
        image={
          "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg"
        }
      />
      <Grid container>
        <Grid item xs={9}>
          <ContentCard
            title={"About"}
            image={
              "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg"
            }
            description={(props.charity === null || props.charity.CharityDescription === null) ? "Loading..." : props.charity.CharityDescription}
          />
        </Grid>
        <Grid item xs={3}>
          <Rankings />
        </Grid>
      </Grid>
      <ContentCard
        title={"Welcome to the second part of this charity"}
        image={
          "https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg"
        }
        description={"the second one"}
      />
      <ContentCard
        title={"Another One"}
        image={
          "https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg"
        }
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pharetra eros augue, at suscipit urna consequat id. Sed dignissim a ante nec vestibulum. Duis viverra, urna sed elementum fermentum, nunc sem molestie lorem, a pretium leo turpis in ligula. Ut quis ex sit amet orci finibus accumsan non in arcu. Morbi lobortis nibh ut libero rhoncus dapibus. Pellentesque venenatis aliquet risus, eget condimentum lorem gravida non. Sed tristique arcu ut dapibus tristique. Morbi pharetra quam eu nisl tincidunt, id mattis purus porta. Maecenas et lobortis ipsum. Vivamus lectus sem, semper ac diam varius, accumsan ultrices tortor. Sed eu est dolor.Vestibulum non ex neque. Ut hendrerit sodales maximus. Donec eget scelerisque diam. Nunc cursus est id elit molestie molestie. Duis mattis, arcu quis consequat suscipit, felis erat tempus felis, non finibus nisi risus nec ante. Nullam id sapien nec lectus dignissim pharetra eu sed massa. Sed vitae porttitor nisi. Sed justo nibh, maximus eu mi eget, lobortis feugiat lorem. Integer felis ipsum, lobortis sit amet commodo in, iaculis non ligula."
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    charity: state.charity.charity,
  };
};

export default connect(
  mapStateToProps
)(Home);
