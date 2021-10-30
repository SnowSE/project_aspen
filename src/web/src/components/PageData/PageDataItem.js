const PageDataItem = (props) => {
    return (
        <div>
            <p>{props.pdKey ?? 'unnamed key'}</p>
        </div>
    )
};

export default PageDataItem;