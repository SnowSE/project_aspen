import React, {useState, useEffect} from "react";
import mockApiResult from "./tempMockResult";
import AddUpdateCharityForm from "./AddUpdateCharityForm";
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
      props.adminFetchAllCharities();
    }, []);

    const classes = useStyles();
    const keyIsEven = (key: number) => {
        return ((key % 2) === 0)
    };
    return (
        <Container>
            <h2>Charity List</h2>
            {props.charityList.map((Charity, key)=> (
                <Link to={`/globalAdministration/details/${Charity.ID}`} key={key}>
                    <p className={keyIsEven(key)? classes.CharityDefault: classes.CharityDefault +" "+ classes.CharityOdd}>
                        {Charity.Domain}
                    </p>
                </Link>
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