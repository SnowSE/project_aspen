import { FormEvent, useState } from "react";
import { PageData } from "../../models/pageData";

interface Props {
  pageData: PageData;
  onSubmit: (data: PageData ) => void;
  onCancel: () => void;
}
const PageDataItemForm = ({ pageData, onCancel, onSubmit }: Props) => {
  const [data, setData] = useState<string>(JSON.stringify(pageData.data) ?? "");
  const [isDataValid, setIsDataValid] = useState(true);

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

  return (
    <form onSubmit={submitHandler}>
      <label>{pageData.key}</label>
      <textarea value={data.toString()} onChange={dataChangedHandler} />
      <button type="submit">Save</button>
      <button type="button" onClick={() => onCancel()}>
        Cancel
      </button>
    </form>
  );
};

export default PageDataItemForm;
