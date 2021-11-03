import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewPageDataForm from "../components/PageData/NewPageDataForm";
import NewEventForm from "../components/Forms/NewEventForm";
import PageDataItemForm from "../components/PageData/PageDataItemForm";
import PageDataList from "../components/PageData/PageDataList";
import {
  clearCurrentKey,
  getPageDataKeys,
  postPageData,
  putPageData,
} from "../store/pageDataSlice";
import { useStoreSelector } from "../store";
import EventModel from "../models/event";
import { PageData } from "../models/pageData";

const PageDataPage = () => {
  const dispatch = useDispatch();
  const pdState = useStoreSelector((state) => state.pageData);
  const pageData: PageData = { key: pdState.currentKey ?? "", data: JSON.parse(pdState.currentData ?? "{}") };

  useEffect(() => {
    dispatch(getPageDataKeys());
  }, [dispatch]);

  const submitNewPDHandler = (pageData: PageData) => {
    dispatch(postPageData(pageData));
    console.log(pdState);
  };

  const updatePageDataHandler = (pageData: PageData) => {
    console.log(pageData);
    dispatch(putPageData(pageData));
  };

  const cancelHandler = () => {
    dispatch(clearCurrentKey({}));
  };

  const newEvent: EventModel = {
    ID: -1,
    date: new Date(),
    location: "",
    description: "",
    primaryImageUrl: "",
  };
  return (
    <div>
      <NewEventForm event={newEvent} isEditing={true} />
      <NewPageDataForm onSubmit={submitNewPDHandler} />
      <PageDataList keys={pdState.keys} />
      {pdState.currentKey && (
        <PageDataItemForm
          pageData={pageData}
          onSubmit={updatePageDataHandler}
          onCancel={cancelHandler}
        />
      )}
    </div>
  );
};

export default PageDataPage;
