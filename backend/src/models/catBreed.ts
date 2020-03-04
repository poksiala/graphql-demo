const mongoose = require('mongoose')

const catBreedSchema = new mongoose.Schema({
  name: String,
  description: String,
  temperament: String,
  origin: String
})

catBreedSchema.statics.format = (catBreed) => {
  return {
    id: catBreed._id,
    name: catBreed.name,
    description: catBreed.description,
    temperament: catBreed.temperament,
    origin: catBreed.origin
  }
}

const CatBreed = mongoose.model('CatBreed', catBreedSchema)

module.exports = CatBreed
