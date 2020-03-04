
const CatBreed = require('../models/catBreed');

const catBreedsResolver = async () => {
  try {
    const catBreeds = await CatBreed
      .find({});
    return catBreeds.map(CatBreed.format);
  } catch (exception) {
      console.error(exception);
  }
}

const catBreedResolver = async (parent: any, args: any, context: any, info: any) => {
  try {
    const breed = await CatBreed.findById(args.id);
    return CatBreed.format(breed);
  } catch (exception) {
    console.error(exception);
  }
};

const catBreedSearchResolver = async (parent: any, args: any, context: any, info: any) => {
  try {
    const re = new RegExp(args.name, 'i');
    const breeds = await CatBreed.find({name: re})
    return breeds.map(CatBreed.format)
  } catch (exception) {
    console.error(exception);
  }
}

export { catBreedsResolver, catBreedResolver, catBreedSearchResolver };
