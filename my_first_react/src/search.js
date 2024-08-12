import React, { Component } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      images: [],
    };
  }

  fetchImages = async () => {
    try {
      const { searchTerm } = this.state;
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=BFnb80UlSfsHeJY02i6jj2LB2bavp6a8Q0DbwhA-ZYU&query=${searchTerm}&page=1&per_page=20`
      );
      const images = response.data.results;
      this.setState({ images });
    } catch (error) {
      console.error('Error fetching images:', error.response ? error.response.data : error.message);
    }
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.fetchImages();
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input
            className="form-control"
            type="search"
            onChange={(event) => this.setState({ searchTerm: event.target.value })}
            placeholder="Search..."
          />
          <button type="submit" className="btn btn-link text-white hover hover-secondary">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridGap: '10px',
          }}
        >
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    );
  }
}

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  componentWillUnmount() {
    this.imageRef.current.removeEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.imageRef.current.style.gridRowEnd = `span ${spans}`;
    this.setState({ spans });
  }

  render() {
    const { description, urls } = this.props.image;
    return (
      <img
        ref={this.imageRef}
        alt={description}
        src={urls.regular}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    );
  }
}

export default Search;
