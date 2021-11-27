import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import TeamForm from "../components/Team/TeamForm";
import { useStoreSelector } from "../store";
import { createPerson, getPersonByAuthId } from "../store/personSlice";
import Person from "../models/person";
const TeamRegistrationPage = () => {
  const authId =
    useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
  const given_name =
    useStoreSelector((state) => state.auth.user?.profile.given_name) ?? "";
  const selectedPerson = useStoreSelector(
    (state) => state.person.selectedPerson
  );
  const dispatch = useDispatch();

  const checkPerson = useCallback(async () => {
    await dispatch(getPersonByAuthId(authId));
    if (!selectedPerson) {
      const person = new Person(authId, given_name, "");
      await dispatch(createPerson(person));
      await dispatch(getPersonByAuthId(authId));
    }
  },[authId, dispatch, given_name, selectedPerson]);  

  useEffect(() => {
    //dispatch(getPersonByAuthId(authId));
    checkPerson();
  }, [checkPerson]);

  return (
    <div>
      {!selectedPerson ? (
        <div>Loading</div>
      ) : (
        <TeamForm ownerId={selectedPerson.id} />
      )}
    </div>
  );
};

export default TeamRegistrationPage;
