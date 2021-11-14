import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageDataItemForm from "../components/PageData/PageDataItemForm";
import PageDataList from "../components/PageData/PageDataList";
import {
  clearCurrentKey,
  getPageDataKeys,
  putPageData,
} from "../store/pageDataSlice";
import { useStoreSelector } from "../store";
import { PageData } from "../models/pageData";

const PageDataPage = () => {
  const dispatch = useDispatch();
  const pdState = useStoreSelector((state) => state.pageData);
  const pageData: PageData = {
    key: pdState.currentKey ?? "",
    data: JSON.parse(pdState.currentData ?? "{}"),
  };

  useEffect(() => {
    dispatch(getPageDataKeys());
  }, [dispatch]);

  const updatePageDataHandler = (pageData: PageData) => {
    console.log(pageData);
    dispatch(putPageData(pageData));
  };

  const cancelHandler = () => {
    dispatch(clearCurrentKey({}));
  };

  return (
    <div className="container border pb-4">
      <div className="fs-3 text-center bg-light ">Page Data</div>
      <div className="row px-5 mt-2">
        <div className="col-3 border">
          <PageDataList keys={pdState.keys} />
        </div>
        <div className="col-9">
          {pdState.currentKey && (
          <PageDataItemForm
            pageData={pageData}
            onSubmit={updatePageDataHandler}
            onCancel={cancelHandler}
          />
          )}
        </div>        
      </div>
      
    </div>
  );
};

export default PageDataPage;
