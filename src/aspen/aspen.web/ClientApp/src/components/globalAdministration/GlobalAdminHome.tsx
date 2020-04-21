import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, createStyles, makeStyles } from "@material-ui/core";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/GlobalAdmin/actions";
import { Charity } from "../../models/CharityModel";

const useStyles = makeStyles(()=>
    createStyles({
        CharityDefault: {
            padding: "1vh",
            textAlign: "center",
        },
        CharityOdd: {
            background: "gainsboro",
        },
        AddButton: {
            background: "lightblue"
        }
    })
)

interface GlobalAdminHomeProps {
    adminFetchAllCharities: typeof actionCreators.adminFetchAllCharities,
    charityList: Charity[],
};



const GlobalAdminHome:React.FC<GlobalAdminHomeProps> = props => {
    useEffect(() => {
      console.error(props.adminFetchAllCharities())
    });

    const classes = useStyles();

    return (
        <Container>
            <h2>Charity List</h2>
            {props.charityList.map((Charity, key)=> (
                <>
                <p >{key} </p>
                <Link to={`/globalAdministration/details/${Charity.ID}`} key={Charity.ID}>
                    <p>{ Charity.CharityName}</p>
                </Link>
                </>
            ))}
            <Button className={classes.AddButton} href={`/globalAdministration/new`}>Add New</Button>
        </Container>
    )
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        charityList: state.admin.charityList
    }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(GlobalAdminHome);