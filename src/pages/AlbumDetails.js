import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchImages } from "../features/imageFeature/imageSlice";
import ImageCard from "../features/imageFeature/ImageCard";
import { fetchAlbumDetails } from "../features/album/albumSlice";
import AddSharedUsers from "../components/AddSharedUsers";

const AlbumDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { albumId } = useParams();

  const { albumDetails } = useSelector((state) => state.album);
  const { images, status } = useSelector((state) => state.image || []);

  const [sortedImages, setSortedImages] = useState([]);
  const [tags, setTags] = useState("");

  useEffect(() => {
    dispatch(fetchImages({ albumId }));
    dispatch(fetchAlbumDetails(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    setSortedImages(images);
  }, [images]);

  const onClickHandlerForSortByFavorites = () => {
    const favorites = images.filter((image) => image.isFavorite);
    setSortedImages(favorites);
  };

  const onClickHandlerForSortByTags = () => {
    dispatch(fetchImages({ albumId, tags }));
  };

  const onShowAllImages = () => {
    dispatch(fetchImages({ albumId }));
    setTags("");
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row align-items-start mb-4">
          <div className="col-12 col-lg-8 mb-3">
            <h1 className="fw-bold">{albumDetails?.name}</h1>
            <p className="text-muted">{albumDetails?.description}</p>
          </div>

          <div className="col-12 col-lg-4 d-flex justify-content-start justify-content-lg-end">
            <button
              type="button"
              className="btn btn-secondary me-3 mb-2 mb-lg-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#sharedUsersOffcanvas"
            >
              Add Shared Users
            </button>
            <Link to={`/album/addImage/${albumId}`} className="btn btn-success">
              Add Image
            </Link>
          </div>
        </div>

        <div>
          {status === "loading" && (
            <div className="container py-5 text-center">
              <p>Loading...</p>
            </div>
          )}
        </div>

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 rounded mb-4">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <button
              className="btn btn-primary me-2"
              onClick={onClickHandlerForSortByFavorites}
            >
              Sort by Favorites
            </button>
            <button className="btn btn-secondary" onClick={onShowAllImages}>
              Show All Images
            </button>
          </div>
          <div className="d-flex align-items-center">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search by tag"
              style={{ maxWidth: "300px" }}
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
            <button
              className="btn btn-primary"
              onClick={onClickHandlerForSortByTags}
            >
              Search
            </button>
          </div>
        </div>

        <div className="row mt-4">
          {sortedImages.length > 0 ? (
            sortedImages.map((image) => (
              <ImageCard
                key={image._id}
                image={image}
                sharedAlbum={location.state.isSharedAlbum}
              />
            ))
          ) : (
            <p className="text-muted">No images available in this album.</p>
          )}
        </div>
      </div>
      <AddSharedUsers albumId={albumId} />
    </div>
  );
};

export default AlbumDetails;
