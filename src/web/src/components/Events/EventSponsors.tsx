import { FC } from "react";

const EventSponsors: FC = (): JSX.Element => {
    const fakeSponsors = ['Snow College', 'McDonald\'s', 'Taco Bell', 'Microsoft'];

    return (
        <div className='p-2'>
            <h5 className='text-center'>Sponsors</h5>
            {fakeSponsors.map(s => <p>{s}</p>)}
        </div>
    )
};

export default EventSponsors;