import { useDispatch } from "react-redux";
import { deletePageData, setCurrentKey } from "../../store/pageDataSlice";

const PageDataList = ({keys}: {keys: string[]}) => {
  const dispatch = useDispatch();

  const editKeyHandler = (key: string) => {
    dispatch(setCurrentKey(key))
  };

  const deleteKeyHandler = (key: string) => {
    dispatch(deletePageData(key))
  };

  return (
    <div>
      {keys.map((k) => {
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
