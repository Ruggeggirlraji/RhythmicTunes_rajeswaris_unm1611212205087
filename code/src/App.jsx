import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Songs from "./Components/Songs";
import Sidebar from "./Components/Sidebar";
import Favorities from "./Components/Favorities";
import Playlist from "./Components/Playlist";
import Uhome from "./Components/Uhome";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar - Fixed on Left */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Uhome />} />  {/* Home Page */}
            <Route path="/songs" element={<Songs />} />
            <Route path="/favorities" element={<Favorities />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
