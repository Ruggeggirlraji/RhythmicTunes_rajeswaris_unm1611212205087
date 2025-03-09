import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get("http://localhost:3000/items")
        .then((response) => {
          const filteredResults = response.data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.singer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.genre.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredResults);
        })
        .catch((error) => {
          console.error("Error fetching search results: ", error);
          setSearchResults([]); // Default to empty if error occurs
        });
    } else {
      setSearchResults([]); // Clear results when search is empty
    }
  }, [searchTerm]);

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <h2 className="text-3xl font-semibold mb-4 text-center">Search Songs</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by singer, genre, or song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ outline: "none", boxShadow: "none", border: "1px solid #ced4da", borderRadius: "0.25rem" }}
          className="search-input"
        />
      </InputGroup>

      <div style={{ width: "960px", display: "grid", gridTemplateColumns: "auto auto auto", gap: "30px" }}>
        {searchResults.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <img
              src={item.imgUrl}
              alt="Song"
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
            />
            <h3>{item.title}</h3>
            <p><strong>Genre:</strong> {item.genre}</p>
            <p><strong>Singer:</strong> {item.singer}</p>
            <audio controls style={{ width: "100%" }}>
              <source src={`/Songs/${item.songUrl}`} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
