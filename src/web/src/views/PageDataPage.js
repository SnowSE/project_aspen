import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewPageDataForm from "../components/PageData/NewPageDataForm";
import PageDataItemForm from "../components/PageData/PageDataItemForm";
import PageDataList from "../components/PageData/PageDataList";
import { clearCurrentKey, getPageDataKeys, postPageData, putPageData } from "../store/pageDataSlice";

const PageDataPage = () => {
  const dispatch = useDispatch();
  const pdState = useSelector(state => state.pageData);
  const pageData = { key: pdState.currentKey, data: pdState.currentData}
  
  useEffect(() => {
    dispatch(getPageDataKeys())
  }, []);

  const submitNewPDHandler = (pageData) => {
    dispatch(postPageData(pageData));
    console.log(pdState);
  };

  const updatePageDataHandler = (pageData) => {
    console.log(pageData);
    dispatch(putPageData(pageData))
  };

  const cancelHandler = () => {
    dispatch(clearCurrentKey());
  };

  return (
    <div>
      <NewPageDataForm onSubmit={submitNewPDHandler}/>
      <PageDataList keys={pdState.keys} />
      {pdState.currentKey && <PageDataItemForm pageData={pageData} onSubmit={updatePageDataHandler} onCancel={cancelHandler}/>}
    </div>
  );
};

export default PageDataPage;
