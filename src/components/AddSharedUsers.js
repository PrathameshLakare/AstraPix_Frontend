import React, { useState } from "react";
import { addSharedUsers } from "../features/album/albumSlice";
import { useDispatch, useSelector } from "react-redux";

const AddSharedUsers = ({ albumId }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.album);
  const [sharedUsers, setSharedUsers] = useState([""]);

  const handleSharedUserChange = (index, value) => {
    const updatedSharedUsers = [...sharedUsers];
    updatedSharedUsers[index] = value;
    setSharedUsers(updatedSharedUsers);
  };

  const addSharedUserField = () => {
    setSharedUsers([...sharedUsers, ""]);
  };

  const removeSharedUserField = (index) => {
    setSharedUsers(sharedUsers.filter((_, ind) => ind !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      addSharedUsers({ albumId, emails: sharedUsers })
    );
    if (result.type.endsWith("fulfilled")) {
      alert("Shared users successfully added!");
      setSharedUsers([""]);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      id="sharedUsersOffcanvas"
      aria-labelledby="sharedUsersOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sharedUsersOffcanvasLabel">
          Manage Shared Users
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          {sharedUsers.map((email, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Enter user email"
                value={email}
                required
                onChange={(e) => handleSharedUserChange(index, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeSharedUserField(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary w-100 mb-3"
            onClick={addSharedUserField}
          >
            Add Email
          </button>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={status === "loading"}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSharedUsers;
