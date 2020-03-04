import React, { FunctionComponent } from 'react'

interface EventFunction {
  (event: React.FormEvent<HTMLFormElement>): void
}

interface ChangeEventFunction {
  (event: React.ChangeEvent<HTMLInputElement>): void
}


type BreedSearchProps = {
    handleSubmit: EventFunction,
    handleChange: ChangeEventFunction,
    search: string
}

const BreedSearch: FunctionComponent<BreedSearchProps> = ({ handleSubmit, handleChange, search }) => {
    return (
      <div>
        <h2>Search:</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Breed name:
            <input
              value={search}
              onChange={handleChange}
              name="name"
            />
          </div>
          <button type="submit">Search!</button>
        </form>
      </div>
    )
  }

export default BreedSearch