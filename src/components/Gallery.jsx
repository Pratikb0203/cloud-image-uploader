import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Gallery({ user }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const imagesQuery = query(
        collection(db, "images"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(imagesQuery);
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(list);
      setLoading(false);
    };

    fetchImages();
  }, [user.uid]);

  return (
    <div className="panel">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Gallery</p>
          <h2>Your image collection</h2>
        </div>
        <div className="gallery-stat">
          <span>{images.length}</span>
          <small>items</small>
        </div>
      </div>

      {loading ? <p className="subtitle">Loading your uploaded images...</p> : null}
      {!loading && images.length === 0 ? (
        <div className="empty-state">
          <h3>No images uploaded yet</h3>
          <p className="subtitle">
            Upload your first image and it will appear here in a cleaner gallery layout.
          </p>
        </div>
      ) : null}

      <div className="gallery-scroll">
        <div className="gallery-grid">
          {images.map((img) => (
            <article key={img.id} className="gallery-card">
              <img
                src={img.imageUrl}
                alt={img.fileName ? `Uploaded file ${img.fileName}` : "Uploaded by user"}
                className="gallery-image"
              />
              <div className="gallery-meta">
                <h3>{img.fileName || "Untitled image"}</h3>
                <p>
                  {img.createdAt
                    ? new Date(img.createdAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Recently uploaded"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
