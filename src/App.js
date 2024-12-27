import { useLocation } from "react-router-dom";
import { GoogleOauth } from "./pages/GoogleOauth.js";
import { Home } from "./pages/Home.js";
import CreateAlbum from "./pages/CreateAlbum.js";
import AlbumDetails from "./pages/AlbumDetails.js";
import AddImage from "./pages/AddImage.js";
import { Route, Routes } from "react-router-dom";
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
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/create-album" element={<CreateAlbum />} />
        <Route path="/album/:albumId" element={<AlbumDetails />} />
        <Route path="/album/addImage/:albumId" element={<AddImage />} />
        <Route path="/albums/shared" element={<SharedAlbums />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </div>
  );
}

export default App;
