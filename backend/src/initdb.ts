const CatBreed = require('./models/catBreed');


const breedData = [
    {
        name: 'Spacecat',
        temperament: 'Likes to be alone',
        description: 'Straight from science fiction',
        origin: 'Outer space'
    }, {
        name: 'Persian',
        temperament: 'Proud',
        description: 'A classic choice',
        origin: 'Persia'
    }, {
        name: 'Norwegian Forrest Cat',
        temperament: 'Independent',
        description: 'Fluffy',
        origin: 'Norway'
    }
]


const initIfEmpty = async () => {
    try {
        const breedFromDB = await CatBreed.findOne({});
        if (breedFromDB === null) {
            console.log('Database empty, inserting breeds')
            const newBreeds = breedData.map((breed) => {
                return new CatBreed(breed);
            });
            const newBreedPromises = newBreeds.map((breed) => breed.save());
            await Promise.all(newBreedPromises);
            console.log('Database initialized')
        } else {
            console.log('Found breeds from database')
        }
    } catch (exception) {
        console.log(exception);
    }
}

export default initIfEmpty