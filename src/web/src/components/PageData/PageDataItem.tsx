const PageDataItem = ({key}: {key: string}) => {
    return (
        <div>
            <p>{key ?? 'unnamed key'}</p>
        </div>
    )
};

export default PageDataItem;