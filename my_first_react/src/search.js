import React from 'react';
import axios from 'axios';


class Search extends React.Component {
    state = {
      query: '',
    };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

    handleSearch = async (event) => {
        event.preventDefault();
        const { query } = this.state;
        const accessKey = 'BFnb80UlSfsHeJY02i6jj2LB2bavp6a8Q0DbwhA-ZYU'; 

        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: { query },
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

  render() {
    const{query} = this.state;
    return (
      <form onSubmit={this.handleSearch}>
          <label>
            <input
                type="text"
                value={query}
                onChange={this.handleChange}
                placeholder="Search..."
            />
          </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
