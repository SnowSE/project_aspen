import React, { FormEvent, useState, useEffect } from "react";
import { PageData } from "../../models/pageData";
import { useDispatch } from 'react-redux'
import { alertActions } from "../../store/alertSlice";



interface Props {
  pageData: PageData;
  onSubmit: (data: PageData ) => void;
  onCancel: () => void;
}
const PageDataItemForm = ({ pageData, onCancel, onSubmit }: Props) => {
  
  const [data, setData] = useState(JSON.stringify(pageData.data) ?? "");
  const [isDataValid, setIsDataValid] = useState(true);
  const dispatch= useDispatch();
  useEffect(() => {
    
    setData(JSON.stringify(pageData.data) ?? "")
  }, [pageData])

  console.log(pageData.key, data, isDataValid);

  const dataChangedHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    setData(event.currentTarget.value);
    try {
      JSON.parse(event.currentTarget.value);
      setIsDataValid(true);
    } catch {
      setIsDataValid(false);
    }
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (isDataValid) {
      onSubmit({ key: pageData.key, data: JSON.parse(data.toString()) });
    }
  };
  const displayAlert = () => 
    dispatch(alertActions.displayAlert({title: "Success!", message: "Successfully Submitted!", danger: false}));

  return (
    <div className="border p-3">
      <form onSubmit={submitHandler}>
        <label className="form-label fs-5">{pageData.key}</label>
        {/* <TextInput ></TextInput> */}
        <textarea className="form-control" value={data} onChange={dataChangedHandler} />
        <button type="submit" className="btn btn-primary btn-sm me-1 my-2">Save</button>
        <button type="button" className="btn btn-secondary btn-sm ms-1 my-2" onClick={() => onCancel()}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default PageDataItemForm;
