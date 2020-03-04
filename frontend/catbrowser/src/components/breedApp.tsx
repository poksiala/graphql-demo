import React, {Component} from 'react'
import Breed from '../types/breed';
import BreedList from './breedList'
import BreedSearch from './breedSearch'
import breedService from '../services/catBreeds'

interface BreedAppState {
  breeds: Map<string, Breed>,
  filter: Array<string>,
  search: string,
  showAll: Boolean
}

class BreedApp extends Component<{}, BreedAppState> {

  state: BreedAppState = {
      breeds: new Map(),
      filter: [],
      showAll: true,
      search: ''
    }

  async componentDidMount() {
      const breedMap = new Map()
      const breeds = await breedService.getAll()
      breeds.forEach(breed => breedMap.set(breed.id, breed))
      this.setState({breeds: breedMap})
  }

  changeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const newSearch: string = event.target.value;
    this.setState({ search: newSearch })
  }

  applySearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { search } = this.state;
    if (!search) {
        this.setState({ filter: [], showAll: true})
    } else {
        breedService.getIdsByName(search)
          .then(filter => this.setState({filter, showAll: false}))
          .catch(err => console.log(err))
    }
  }

  getFilteredBreeds = (): Array<Breed> => {
    const { breeds, filter, showAll } = this.state;
    if (showAll) return Array.from(breeds.values());
    const res: Array<Breed> = [];
    filter.forEach(id => {
        const breed = breeds.get(id);
        if (breed === undefined) return;
        res.push(breed);
    });
    return res;
  }

  public render() {
    const { search } = this.state;
    const filteredBreeds = this.getFilteredBreeds();
    const sortedFilteredBreeds = filteredBreeds.sort((a: Breed, b: Breed) => a.id < b.id ? -1 : 1)
    return (
      <div>
        <BreedSearch search={search} handleChange={this.changeSearch} handleSubmit={this.applySearch}/>
        <BreedList breeds={sortedFilteredBreeds} />
      </div>
    );
  }
}

export default BreedApp;
