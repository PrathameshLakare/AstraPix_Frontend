import { Route, Routes, useLocation } from "react-router-dom";
import { GoogleOauth } from "./pages/GoogleOauth.js";
import { Home } from "./pages/Home.js";
import CreateAlbum from "./pages/CreateAlbum.js";
import AlbumDetails from "./pages/AlbumDetails.js";
import AddImage from "./pages/AddImage.js";
import { Navbar } from "./components/Navbar.jsx";
import { SharedAlbums } from "./pages/SharedAlbums.js";
import { AlbumsPage } from "./pages/AlbumsPage.js";
import Protected from "./components/Protected.js";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/"];

  return (
    <div>
      {!hideSidebarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<GoogleOauth />} />
        <Route path="/profile" element={<GoogleOauth />} />
        <Route path="/home" element={<Protected Component={Home} />} />
        <Route
          path="/create-album"
          element={<Protected Component={CreateAlbum} />}
        />
        <Route
          path="/album/:albumId"
          element={<Protected Component={AlbumDetails} />}
        />
        <Route
          path="/album/addImage/:albumId"
          element={<Protected Component={AddImage} />}
        />
        <Route
          path="/albums/shared"
          element={<Protected Component={SharedAlbums} />}
        />
        <Route path="/albums" element={<Protected Component={AlbumsPage} />} />
      </Routes>
    </div>
  );
}

export default App;
