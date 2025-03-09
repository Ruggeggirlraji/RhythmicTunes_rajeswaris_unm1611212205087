import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaSearch, FaList } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000";

function Songs() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/items`)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching items:", error));

    axios.get(`${API_BASE_URL}/favorities`)
      .then(response => setFavorites(response.data))
      .catch(() => setFavorites([]));

    axios.get(`${API_BASE_URL}/playlist`)
      .then(response => setPlaylist(response.data))
      .catch(() => setPlaylist([]));
  }, []);

  const handleAudioPlay = (audioElement) => {
    if (currentlyPlaying && currentlyPlaying !== audioElement) {
      currentlyPlaying.pause();
    }
    setCurrentlyPlaying(audioElement);
  };

  const addToFavorites = async (item) => {
    try {
      const favItem = { ...item, itemId: item.id };
      await axios.post(`${API_BASE_URL}/favorities`, favItem);
      setFavorites([...favorites, favItem]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/favorities/${id}`);
      setFavorites(favorites.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const isFavorite = (id) => favorites.some(item => item.itemId === id);

  const addToPlaylist = async (item) => {
    try {
      const playlistItem = { ...item, itemId: item.id };
      await axios.post(`${API_BASE_URL}/playlist`, playlistItem);
      setPlaylist([...playlist, playlistItem]);
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };

  const removeFromPlaylist = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/playlist/${id}`);
      setPlaylist(playlist.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing from playlist:", error);
    }
  };

  const isInPlaylist = (id) => playlist.some(item => item.itemId === id);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.singer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <h2 className="text-3xl font-semibold mb-4 text-center" style={{ color: "whitesmoke" }}>Songs List</h2>

      <InputGroup className="mb-3">
        <InputGroup.Text id="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by singer, genre, or song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </InputGroup>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100">
              <img
                src={`${API_BASE_URL}${item.imgUrl}`}
                alt="Item"
                className="card-img-top rounded-top"
                style={{ height: "200px", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Genre: {item.genre}</p>
                <p className="card-text">Singer: {item.singer}</p>

                <audio controls className="w-100" onPlay={(e) => handleAudioPlay(e.target)}>
                  <source src={`${API_BASE_URL}${item.songUrl}`} type="audio/mpeg" />
                </audio>
              </div>
              <div className="card-footer d-flex justify-content-between">
                {isFavorite(item.id) ? (
                  <Button variant="light" onClick={() => removeFromFavorites(item.id)}>
                    <FaHeart color="red" />
                  </Button>
                ) : (
                  <Button variant="light" onClick={() => addToFavorites(item)}>
                    <FaRegHeart color="black" />
                  </Button>
                )}

                {isInPlaylist(item.id) ? (
                  <Button variant="outline-secondary" onClick={() => removeFromPlaylist(item.id)}>
                    Remove from Playlist
                  </Button>
                ) : (
                  <Button variant="outline-primary" onClick={() => addToPlaylist(item)}>
                    <FaList /> Add to Playlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;
