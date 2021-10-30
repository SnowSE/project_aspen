const PageDataItem = (props) => {
    return (
        <div>
            <p>{props.pdKey ?? 'unnamed key'}</p>
            <button type='button'>Edit</button>
            <button type='button'>Delete</button>
        </div>
    )
};

export default PageDataItem;