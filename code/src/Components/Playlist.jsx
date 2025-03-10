import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/playlist`)
      .then((response) => setPlaylist(response.data))
      .catch((error) => {
        console.error("Error fetching playlist: ", error);
        setPlaylist([]); // Default to an empty list on error
      });
  }, []);

  const handleAudioPlay = (audioElement) => {
    if (currentlyPlaying && currentlyPlaying !== audioElement) {
      currentlyPlaying.pause(); // Pause the currently playing audio
    }
    setCurrentlyPlaying(audioElement); // Update currently playing audio
  };

  const removeFromPlaylist = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/playlist/${id}`);
      setPlaylist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from playlist: ", error);
    }
  };

  const playAllSongs = () => {
    if (playlist.length === 0) return;
    let currentIndex = 0;

    const playNextSong = () => {
      if (currentIndex < playlist.length) {
        const nextAudio = document.getElementById(`audio-${playlist[currentIndex].id}`);
        if (nextAudio) {
          nextAudio.play();
          nextAudio.addEventListener("ended", () => {
            currentIndex++;
            playNextSong();
          });
        }
      } else {
        setIsPlaying(false); // Reset when all songs finish
      }
    };

    if (isPlaying) {
      const firstAudio = document.getElementById(`audio-${playlist[0].id}`);
      firstAudio.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playNextSong();
    }
  };

  return (
    <div style={{ marginLeft: "230px" }}>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Playlist</h2>

        <Table responsive style={{ width: "1150px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Actions</th>
              <th>
                <Button
                  style={{ backgroundColor: "blue", border: "none", width: "50px" }}
                  onClick={playAllSongs}
                >
                  {isPlaying ? (
                    <FaPauseCircle style={{ width: "40px", height: "25px" }} />
                  ) : (
                    <FaPlayCircle style={{ width: "40px", height: "25px" }} />
                  )}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <img
                      src={`${API_BASE_URL}${item.imgUrl}`}
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
                    style={{ backgroundColor: "red", border: "none" }}
                    onClick={() => removeFromPlaylist(item.id)}
                  >
                    Remove
                  </Button>
                </td>
                <td>
                  <audio
                    controls
                    id={`audio-${item.id}`}
                    style={{ width: "280px" }}
                    onPlay={(e) => handleAudioPlay(e.target)}
                  >
                    <source src={`${API_BASE_URL}${item.songUrl}`} type="audio/mpeg" />
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

export default Playlist;
