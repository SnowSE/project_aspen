import { useDispatch } from "react-redux";
import { deletePageData, setCurrentKey } from "../../store/pageDataSlice";
import { postPageData } from "../../store/pageDataSlice";
import { useStoreSelector } from "../../store";
import { PageData } from "../../models/pageData";
import NewPageDataForm from "./NewPageDataForm";
import { IoTrash } from "react-icons/io5";


const PageDataList = ({keys}: {keys: string[]}) => {
  const dispatch = useDispatch();

  const pdState = useStoreSelector((state) => state.pageData);
  
  const editKeyHandler = (key: string) => {
    dispatch(setCurrentKey(key))
  };

  const deleteKeyHandler = (key: string) => {
    dispatch(deletePageData(key))
  };

  const submitNewPDHandler = (pageData: PageData) => {
    dispatch(postPageData(pageData));
    console.log(pdState);
  };

  return (
    <div className="justify-content-center">
      {keys.map((k) => {
        return (
          <div>
            <button className="btn btn-link text-decoration-none fs-6" onClick={() => editKeyHandler(k)}>{k ?? "Unnamed Key"}</button>
            <button type="button" className="btn btn-link btn-lg">
              <IoTrash onClick={() => deleteKeyHandler(k)} />
            </button>
          </div>
        );
      })}

      <NewPageDataForm onSubmit={submitNewPDHandler} />
    </div>
  );
};

export default PageDataList;
