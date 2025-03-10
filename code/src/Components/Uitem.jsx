import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Unavbar from "./Unavbar";
import { Button } from "react-bootstrap";

const Uitem = () => {
  const [item, setItem] = useState(null); // Initialize item as null
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/${id}`) // Fetching from port 3000
      .then((resp) => {
        console.log(resp.data);
        setItem(resp.data); // Store item details
      })
      .catch(() => {
        console.log("Failed to fetch item details.");
      });
  }, [id]); // Re-fetch data when the ID changes

  return (
    <div>
      <Unavbar />
      <br />

      {item ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center", height: "450px" }}>
            <img
              src={`/picture/${item.imgUrl}`} // Ensure correct path
              alt={`${item.title} Cover`}
              style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: "10px" }}
            />
          </div>
          <h1 className="text-center">{item.title}</h1>

          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <div style={{ width: "45%" }}>
              <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
              <hr style={{ height: "3px", backgroundColor: "black" }} />
              <p style={{ fontSize: "20px" }}>{item.description || "No description available."}</p>
            </div>

            <div style={{ width: "45%" }}>
              <h2 style={{ color: "grey" }}><strong>Details</strong></h2>
              <hr style={{ height: "3px", backgroundColor: "black" }} />
              <p style={{ fontSize: "20px" }}>Title: {item.title}</p>
              <p style={{ fontSize: "20px" }}>Singer: {item.singer}</p>
              <p style={{ fontSize: "20px" }}>Genre: {item.genre}</p>
              <p style={{ fontSize: "20px" }}>ID: {item.id}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button variant="primary" style={{ fontSize: "18px", padding: "10px 20px" }}>
              <Link to={`/orderitem/${item.id}`} style={{ color: "white", textDecoration: "none" }}>
                Buy Now
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <h2 className="text-center">Loading item details...</h2>
      )}
    </div>
  );
};

export default Uitem;
