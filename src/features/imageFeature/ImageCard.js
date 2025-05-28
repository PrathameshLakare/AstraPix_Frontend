import React, { useState } from "react";
import { BsStar, BsStarFill, BsChatDots, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { favoriteImage, deleteImage, addComment } from "./imageSlice";

const ImageCard = ({ image, sharedAlbum }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommentSectionVisible, setCommentSectionVisible] = useState(false);
  const [comment, setComment] = useState("");
  const {
    name,
    tags,
    person,
    comments,
    size,
    uploadedAt,
    file,
    isFavorite,
    albumId,
    _id,
  } = image;

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavorite = (event) => {
    event.preventDefault();
    dispatch(favoriteImage({ albumId, imageId: _id }));
  };

  const handleDelete = () => {
    dispatch(deleteImage({ albumId, imageId: _id }));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    const newComment = { comment };

    dispatch(addComment({ albumId, imageId: _id, comment: newComment }));
    setComment("");
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div
        className="card shadow-sm border-0 position-relative transform-hover"
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div
          className="position-absolute top-0 end-0 p-2"
          onClick={handleFavorite}
          style={{ cursor: "pointer", zIndex: 10 }}
        >
          {isFavorite ? (
            <BsStarFill color="gold" size={24} />
          ) : (
            <BsStar color="gray" size={24} />
          )}
        </div>

        <img
          src={file}
          alt={name}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />

        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <p className="card-text text-muted text-center">
            <small>
              <strong>Uploaded:</strong> {new Date(uploadedAt).toLocaleString()}
            </small>
          </p>

          {isExpanded && (
            <>
              <p className="card-text">
                <strong>Tags:</strong>{" "}
                {tags.length
                  ? tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary me-1"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {tag}
                      </span>
                    ))
                  : " None"}
              </p>
              {person && (
                <p className="card-text">
                  <strong>Tagged Person:</strong> {person}
                </p>
              )}
              <p className="card-text">
                <strong>Size:</strong> {formatSize(size)}
              </p>
              <div className="card-text mt-4">
                <h6 className="fw-bold">Comments</h6>
                {comments?.length > 0 ? (
                  <div
                    className="comment-section overflow-auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-start border-bottom py-2"
                      >
                        <div>
                          <p className="mb-1">
                            <strong>{comment?.user?.name}</strong>{" "}
                            <small className="text-muted">
                              ({new Date(comment?.createdAt).toLocaleString()})
                            </small>
                          </p>
                          <p className="mb-0 text-muted">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No comments yet.</p>
                )}
              </div>
            </>
          )}

          <div className="mt-3">
            <button
              className="btn btn-outline-primary w-100"
              onClick={toggleDetails}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>

          {sharedAlbum ? (
            <div className="mt-2 d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={() =>
                  setCommentSectionVisible(!isCommentSectionVisible)
                }
              >
                <BsChatDots className="me-2" />
                {isCommentSectionVisible ? "Hide Comments" : "Add Comment"}
              </button>
            </div>
          ) : (
            <div className="mt-2 d-flex justify-content-between">
              <button
                className="btn btn-outline-danger btn-sm w-50 me-2"
                onClick={handleDelete}
              >
                <BsTrash /> Delete
              </button>
              <button
                className="btn btn-outline-secondary btn-sm w-50"
                onClick={() =>
                  setCommentSectionVisible(!isCommentSectionVisible)
                }
              >
                <BsChatDots className="me-2" />
                {isCommentSectionVisible ? "Hide Comments" : "Add Comment"}
              </button>
            </div>
          )}

          {isCommentSectionVisible && (
            <div className="mt-3">
              <form onSubmit={handleAddComment}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
