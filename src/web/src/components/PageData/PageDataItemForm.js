import { useState } from "react";

const PageDataItemForm = (props) => {
  const [data, setData] = useState(props.pageData.data ?? "");
  const [isDataValid, setIsDataValid] = useState(true);
  
  console.log(props.pageData.key, data, isDataValid);

  const dataChangedHandler = (event) => {
    setData(event.target.value);
    try {
      JSON.parse(event.target.value);
      setIsDataValid(true);
    }
    catch{
      setIsDataValid(false);
    }
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isDataValid) {
      props.onSubmit({key: props.pageData.key, data: JSON.parse(data)})
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>{props.pageData.key}</label>
      <textarea value={data} onChange={dataChangedHandler} />
      <button type='submit'>Save</button>
      <button type='button' onClick={() => props.onCancel()}>Cancel</button>
    </form>
  );
};

export default PageDataItemForm;
