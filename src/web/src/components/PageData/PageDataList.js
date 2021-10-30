import { useDispatch } from "react-redux";
import { deletePageData, putPageData } from "../../store/pageDataSlice";
import PageDataItem from "./PageDataItem";

const PageDataList = (props) => {
  const dispatch = useDispatch();

  const editKeyHandler = (key) => {

  };

  const deleteKeyHandler = (key) => {
    dispatch(deletePageData(key))
  };

  return (
    <div>
      {props.keys.map((k) => {
        return (
          <div>
            <p>{k ?? "Unnamed Key"}</p>
            <button type="button" onClick={() => editKeyHandler(k)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteKeyHandler(k)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PageDataList;
