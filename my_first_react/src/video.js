import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeVideo = ({ videoId }) => (
  <iframe
    title="YouTube Video"
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    frameBorder="0"
    allowFullScreen 
    width="100%"
    height="400"
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

function Search () {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!searchTerm) return;
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&maxResults=10&key=AIzaSyAQN-K5dzhRrkFusgQ-zpVwJ00gLyuGWzA`
        );
        const videoItems = response.data.items;
        setVideos(videoItems);
        setSelectedVideoId(videoItems.length > 0 ? videoItems[0].id.videoId : null);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault(); 
  };

  const handleThumbnailClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ marginBottom: '20px'}}
      >
        <input
          className="form-control"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for videos..."
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
            onClick={handleThumbnailClick}
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
