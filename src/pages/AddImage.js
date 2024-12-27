import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { postImage } from "../features/imageFeature/imageSlice";

const AddImage = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [file, setFile] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload a file");
      setMessageType("danger");
      return;
    }

    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append(
      "tags",
      tags.split(",").map((tag) => tag.trim())
    );
    imageData.append("person", person);
    imageData.append("isFavorite", isFavorite);
    imageData.append("file", file);

    try {
      const response = await dispatch(postImage({ albumId, imageData }));
      if (response?.payload) {
        setMessage("Image uploaded successfully!");
        setMessageType("success");
        navigate(`/album/${albumId}`);
      } else {
        setMessage(response?.error?.message || "Internal server error.");
        setMessageType("danger");
      }
    } catch (error) {
      setMessage("Failed to upload image. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div>
      <div className="container py-5">
        <h2>Add Image</h2>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Image Name
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
            <label htmlFor="tags" className="form-label">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="person" className="form-label">
              Person
            </label>
            <input
              type="text"
              className="form-control"
              id="person"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isFavorite"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isFavorite">
              Mark as Favorite
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Image
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
