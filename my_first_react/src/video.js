import React, { Component } from 'react';
import axios from 'axios';

const YouTubeVideo = ({ videoId }) => (
  <iframe
    title="YouTube Video"
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    frameBorder="0"
    allowFullScreen 
    width="100%"
    height="300"
  />
);

const VideoThumbnail = ({ video, onClick }) => (
  <div onClick={() => onClick(video.id.videoId)} style={{ marginBottom: '10px' }}>
    <img
      src={video.snippet.thumbnails.medium.url}
      alt={video.snippet.title}
      style={{ width: '100%' }}
    />
    {/* <p>{video.snippet.title}</p> */}
  </div>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      videos: [],
      selectedVideoId: null,
    };
  }

fetchVideos = async () => {
const { searchTerm } = this.state;
    if (!searchTerm) return;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&maxResults=10&key=AIzaSyAQN-K5dzhRrkFusgQ-zpVwJ00gLyuGWzA`
      );
      const videoItems = response.data.items;
      this.setState({
        videos: videoItems,
        selectedVideoId: videoItems.length > 0 ? videoItems[0].id.videoId : null,
      });
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.fetchVideos();
  };

  handleThumbnailClick = (videoId) => {
    this.setState({ selectedVideoId: videoId });
  };

  render() {
    const { searchTerm, videos, selectedVideoId } = this.state;
    return (
      <div>
        <form
            onSubmit={this.handleSearch}
            style={{ marginBottom: '20px'}}
        >
          <input
            className="form-control"
            type="text"
            value={searchTerm}
            onChange={(event) => this.setState({ searchTerm: event.target.value })}
            placeholder="Cari video..."
          />
          <button type="submit" className="btn btn-link text-white hover hover-secondary">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 2,
              marginRight: '10px'
              }}
            >
            {selectedVideoId && <YouTubeVideo videoId={selectedVideoId} />}
          </div>
          <div style={{
                flex: 1,
                overflowY: 'auto',
                height: '300px'
                }}
            >
            {videos.map((video) => (
              <VideoThumbnail
                key={video.id.videoId}
                video={video}
                onClick={this.handleThumbnailClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
