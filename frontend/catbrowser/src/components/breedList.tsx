import React, { FunctionComponent } from 'react';
import Breed from '../types/breed'
import BreedListItem from './breedListItem'

type BreedListProps = {
    breeds: Array<Breed>
}

const BreedList: FunctionComponent<BreedListProps> = ({ breeds }) => {
    return (
        <div>
            <ul>
                {breeds.map(breed => (
                    <li key={breed.id}>
                       <BreedListItem breed={breed} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BreedList;
