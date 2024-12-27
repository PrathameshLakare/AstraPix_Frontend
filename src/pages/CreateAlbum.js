import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAlbum, updateAlbum } from "../features/album/albumSlice";
import { useLocation } from "react-router-dom";

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
      setDescription(location.state.description);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const albumData = { name, description };
    if (name) {
      if (location.state) {
        dispatch(updateAlbum({ albumId: location.state._id, albumData }));
        setMessage("Album updated successfully.");
      } else {
        dispatch(postAlbum(albumData));
        setName("");
        setDescription("");
        setMessage("Album created successfully.");
      }
    } else {
      setMessage("Please provide name for album");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Create New Album</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Album Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            {location.state ? "Update Album" : "Create Album"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbum;
