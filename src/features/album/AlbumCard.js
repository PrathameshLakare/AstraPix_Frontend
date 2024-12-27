import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAlbumById } from "./albumSlice";
import { BsListUl } from "react-icons/bs";

export const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAlbumById(album._id));
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow border-0 position-relative">
        <div className="dropdown position-absolute top-0 end-0 mt-2 me-2">
          <button
            className="btn btn-light p-2 shadow-sm border"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              minWidth: "40px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsListUl className="text-primary" size={20} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link
                to={`/create-album`}
                state={album}
                className="dropdown-item"
              >
                Edit Album
              </Link>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleDelete}
              >
                Delete Album
              </button>
            </li>
          </ul>
        </div>

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
              state={{ isSharedAlbum: false }}
              className="btn btn-primary btn-sm w-100"
            >
              View Album
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
