
const CatBreed = require('../models/catBreed');

const catBreedsResolver = async () => {
    try {
        const catBreeds = await CatBreed
            .find({});
        return catBreeds.map(CatBreed.format);
    } catch (exception) {
        console.log(exception);
    }
}

const catBreedResolver = async (parent: any, args: any, context: any, info: any) => {
    try {
        const breed = await CatBreed.findById(args.id);
        return CatBreed.format(breed);
    } catch (exception) {
        console.log(exception);
    }
};

const catBreedSearchResolver = async (parent: any, args: any, context: any, info: any) => {
    try {
        const re = new RegExp(args.name, 'i');
        const breeds = await CatBreed.find({name: re})
        console.log(typeof breeds)
        console.log({ breeds })
        return breeds.map(CatBreed.format)
    } catch (exception) {
        console.log(exception);
    }
}

export { catBreedsResolver, catBreedResolver, catBreedSearchResolver };