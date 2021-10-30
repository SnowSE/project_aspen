import PageDataItem from "./PageDataItem";

const PageDataList = (props) => {
  console.log(props.keys);
  return (
    <div>
      {props.keys.map((k) => {
        return <PageDataItem pdKey={k} />;
      })}
    </div>
  );
};

export default PageDataList;
