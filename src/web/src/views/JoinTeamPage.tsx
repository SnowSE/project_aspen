import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import JoinTeam from "../components/Team/JoinTeam";
import { useStoreSelector } from "../store";
import { createPerson, getPersonByAuthId } from "../store/personSlice";
import Person from "../models/person";

const JoinTeamPage = () => {
  const authId =
    useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
  const given_name =
    useStoreSelector((state) => state.auth.user?.profile.given_name) ?? "";
  const selectedPerson = useStoreSelector(
    (state) => state.person.selectedPerson
  );

  const personRef = useRef(selectedPerson)
  const dispatch = useDispatch();
  const checkPerson =  useCallback( async () => {
    await dispatch(getPersonByAuthId(authId));
    if (!personRef) {
      const person = new Person(authId, given_name, "");
      await dispatch(createPerson(person));
      await dispatch(getPersonByAuthId(authId));
    }
  }, [authId, dispatch, given_name])

  useEffect(() => {
    //dispatch(getPersonByAuthId(authId));
    checkPerson();
  }, [checkPerson]);


  return (
    <div>
      {!selectedPerson ? (
        <div>Loading</div>
      ) : (
        <JoinTeam ownerId={selectedPerson!.id} />
      )}
    </div>
  );
};

export default JoinTeamPage;
