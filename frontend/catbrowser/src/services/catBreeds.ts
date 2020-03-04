import Breed from '../types/breed';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

const getAll = async (): Promise<Array<Breed>> => {
    const response = await client.query({
        query: gql`
            {
                catBreeds {
                    id
                    name
                    temperament
                    description
                    origin
                }
            }
        `
    });
    return response.data.catBreeds
}

type searchResult = {
    id: string
}

const getIdsByName = async (name: string): Promise<Array<string>> => {
    const response = await client.query({
        query: gql`
            query Breed($name: String!) {
                catBreedSearch(name: $name) {
                    id
                }
            }
        `,
        variables: { name }
    });
    const results: Array<searchResult> = response.data.catBreedSearch
    return results.map(entry => entry.id)
}

export default {
    getAll,
    getIdsByName
}
