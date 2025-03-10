import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Unavbar from "./Unavbar";

const API_BASE_URL = "http://localhost:3000";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_BASE_URL}/wishlist?userId=${user.id}`)
        .then((response) => setWishlist(response.data))
        .catch((error) => {
          console.error("Error fetching wishlist items: ", error);
          setWishlist([]); // Default to empty array if error occurs
        });
    }
  }, [user]);

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/wishlist/${itemId}`);
      setWishlist((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from wishlist: ", error);
    }
  };

  return (
    <div>
      <Unavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Wishlist</h2>
        {wishlist.length === 0 ? (
          <h4 className="text-center text-gray-500">No items in your wishlist.</h4>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={`${API_BASE_URL}${item.imgUrl}`}
                  alt="Item"
                  className="rounded-t-lg w-full h-56 object-cover"
                />
                <div className="p-2">
                  <h5 className="text-xl font-bold">{item.title}</h5>
                  <p className="text-gray-700">Singer: {item.singer}</p>
                  <p className="text-gray-700">Genre: {item.genre}</p>
                  <div className="mt-3 flex justify-between">
                    <Button variant="danger" onClick={() => removeFromWishlist(item.id)}>
                      Remove
                    </Button>
                    <Button variant="primary">
                      <Link
                        to={`/uitem/${item.id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
