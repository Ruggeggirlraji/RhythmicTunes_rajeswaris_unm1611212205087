import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

function Favorities() {
  const [favorites, setFavorites] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/favorities")
      .then((response) => setFavorites(response.data))
      .catch((error) => {
        console.error("Error fetching favorites: ", error);
        setFavorites([]); // Default to an empty list on error
      });
  }, []);

  const handleAudioPlay = (audioElement) => {
    if (currentlyPlaying && currentlyPlaying !== audioElement) {
      currentlyPlaying.pause(); // Pause the currently playing audio
    }
    setCurrentlyPlaying(audioElement); // Set the new currently playing audio
  };

  const removeFromFavorites = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/favorities/${id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from favorites: ", error);
    }
  };

  return (
    <div style={{ marginLeft: "240px" }}>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Favorites</h2>

        <Table responsive style={{ width: "1150px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Actions</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <img
                      src={item.imgUrl}
                      alt="Item"
                      className="rounded"
                      style={{ height: "50px", width: "50px" }}
                    />
                    <div style={{ paddingLeft: "20px" }}>
                      <strong>{item.title}</strong>
                      <p>{item.singer}</p>
                    </div>
                  </div>
                </td>
                <td>{item.genre}</td>
                <td>
                  <Button
                    style={{ backgroundColor: "white", border: "none" }}
                    onClick={() => removeFromFavorites(item.id)}
                  >
                    <FaHeart color="red" />
                  </Button>
                </td>
                <td>
                  <audio
                    controls
                    id={`audio-${item.id}`}
                    style={{ width: "250px" }}
                    onPlay={(e) => handleAudioPlay(e.target)}
                  >
                    <source src={`/Songs/${item.songUrl}`} type="audio/mpeg" />
                  </audio>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Favorities;
