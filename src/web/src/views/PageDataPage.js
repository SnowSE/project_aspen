import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewPageDataForm from "../components/PageData/NewPageDataForm";
import PageDataList from "../components/PageData/PageDataList";
import { getPageDataKeys, postPageData } from "../store/pageDataSlice";

const PageDataPage = () => {
  const dispatch = useDispatch();
  const pdState = useSelector(state => state.pageData);
  
  useEffect(() => {
    dispatch(getPageDataKeys())
  }, []);

  const submitNewPDHandler = (pageData) => {
    dispatch(postPageData(pageData));
    console.log(pdState);
  };

  return (
    <div>
      <NewPageDataForm onSubmit={submitNewPDHandler}/>
      <PageDataList keys={pdState.keys}/>
    </div>
  );
};

export default PageDataPage;
