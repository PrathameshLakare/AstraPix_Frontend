import { Link } from "react-router-dom";
import { fetchUserData } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div>
      <div className="position-relative">
        <img
          src="https://images.pexels.com/photos/10609761/pexels-photo-10609761.jpeg?auto=compress&cs=tinysrgb&w=1400"
          className="img-fluid w-100"
          alt="Landing Page"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      </div>

      <div className="container py-5">
        <div className="text-center mb-5">
          {user ? (
            <>
              <h2 className="fw-bold">Welcome, {user.name}!</h2>
              <p className="text-muted">
                Glad to have you here. Organize your memories and share them
                with others.
              </p>
            </>
          ) : (
            <h2 className="fw-bold">Start Your Journey Today</h2>
          )}
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm py-4">
              <div className="card-body">
                <h5 className="card-title">Your Albums</h5>
                <p className="card-text">View and manage all your albums.</p>
                <Link to="/albums" className="btn btn-primary">
                  View Albums
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm py-4">
              <div className="card-body">
                <h5 className="card-title">Shared Albums</h5>
                <p className="card-text">Access albums shared with you.</p>
                <Link to="/albums/shared" className="btn btn-secondary">
                  Shared Albums
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm py-4">
              <div className="card-body">
                <h5 className="card-title">Create New Album</h5>
                <p className="card-text">
                  Start a new album to save your memories.
                </p>
                <Link to="/create-album" className="btn btn-success">
                  Create Album
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
