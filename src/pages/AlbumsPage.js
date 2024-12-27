import { AlbumCard } from "../features/album/AlbumCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAlbums } from "../features/album/albumSlice";

export const AlbumsPage = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Albums</h2>
        <Link to="/create-album" className="btn btn-success px-4 py-2">
          + Create Album
        </Link>
      </div>

      <div className="row">
        {albums.length > 0 ? (
          albums.map((album) => <AlbumCard key={album._id} album={album} />)
        ) : (
          <div className="col-12">
            <div className="card shadow-sm text-center py-5">
              <div className="card-body">
                <h5 className="card-title text-muted">No albums found</h5>
                <p className="card-text">
                  Start by creating your first album to save your memories.
                </p>
                <Link to="/create-album" className="btn btn-primary">
                  Create an Album
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
