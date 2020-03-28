import React, { useEffect, useState, FunctionComponent } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import ContentCard from "./ContentCard";
import Rankings from "./Rankings";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { APIService } from "../../services/APIService";
import { DomainService } from "../../services/DomainService";
import { ApplicationState } from "../../store";
import * as ThemeStore from "../../store/Theme";
import { Charity } from "../../models/CharityModel";

const useStyles = makeStyles(props=>({
  testDiv:{
    backgroundColor: props.palette.primary.main,
  }
}));


type HomeProps = ThemeStore.ThemeState & typeof ThemeStore.actionCreators;

const Home: FunctionComponent<HomeProps> = props => {
  const classes = useStyles(props);
  const [description, setDescription] = useState("");
  const [charityName, setCharityName] = useState("");
  const [GlobalAdminDomain, setGlobalAdminDomain] = useState("");
  const [APIURL, setAPIURL] = useState("");

  const handleHomeData = async () => {
    let dummyapiservice = new APIService(new DomainService());
    let data = dummyapiservice.PostCreateCharity();
    //let homepagedata = await dummyapiservice.GetCharityByDomain();
    let description = "This charity does not exist";
    let charityName = "This charity does not exist";
    setDescription(description);
    setCharityName(charityName);
  };

  useEffect(() => {
    handleHomeData();
  }, []);

  return (
    <React.Fragment>
      <Header
        greeting={charityName === "" ? "Loading..." : charityName}
        backgroundImage={
          "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg"
        }
      />
      <div className={classes.testDiv}>
        Holiwis
      </div>
      <Grid container>
        <Grid item xs={9}>
          <ContentCard
            title={"About"}
            image={
              "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg"
            }
            description={description === "" ? "Loading..." : description}
          />
        </Grid>
        <Grid item xs={3}>
          <Rankings />
        </Grid>
      </Grid>
      <ContentCard
        title={GlobalAdminDomain === "" ? "Loading..." : GlobalAdminDomain}
        image={
          "https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg"
        }
        description={
          APIURL === "" ? "Loading..." : APIURL
        }
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

export default connect(
  (state: ApplicationState) => state.theme,
  ThemeStore.actionCreators
)(Home);
