import React, { FunctionComponent } from 'react';
import Breed from '../types/breed'


type BreedListItemProps = {
    breed: Breed
}

const BreedListItem: FunctionComponent<BreedListItemProps> = ({ breed }) => {
    const { name, description, temperament, origin } = breed
    return (
        <div className="breed-list-item"> 
            <div>Name: {name}</div> 
            <div>Description: {description}</div>
            <div>temperament: {temperament}</div>
            <div>origin: {origin}</div>
        </div>
    );
}

export default BreedListItem;