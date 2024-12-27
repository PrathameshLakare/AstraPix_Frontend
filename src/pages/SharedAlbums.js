import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSharedAlbums } from "../features/album/albumSlice";

export const SharedAlbums = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album);

  useEffect(() => {
    dispatch(fetchSharedAlbums());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Shared Albums</h1>
        <p className="text-muted">
          Explore albums shared with you by other users.
        </p>
      </div>

      <div className="row">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album._id} className="col-md-4">
              <div className="card mb-4 shadow border-0 position-relative">
                <div
                  className="bg-primary text-white d-flex align-items-center justify-content-center text-center"
                  style={{
                    height: "150px",
                    borderRadius: "0.5rem 0.5rem 0 0",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05rem",
                  }}
                >
                  {album.name}
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{album.name}</h5>
                  <p className="card-text text-muted">
                    {album.description || "No description available."}
                  </p>

                  <div className="mt-3">
                    <Link
                      to={`/album/${album._id}`}
                      state={{ isSharedAlbum: true }}
                      className="btn btn-primary btn-sm w-100"
                    >
                      View Album
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card shadow-sm text-center py-4">
              <div className="card-body">
                <h5 className="card-title text-muted">No albums found</h5>
                <p className="card-text">
                  Albums shared with you will appear here. Start by asking your
                  friends to share an album!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
