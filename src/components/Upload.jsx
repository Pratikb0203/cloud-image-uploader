import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Upload({ user }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "image_upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmn6nncgu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message || "Cloudinary upload failed");
      }

      await addDoc(collection(db, "images"), {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        userId: user.uid,
        userEmail: user.email,
        fileName: file.name,
        createdAt: Date.now(),
      });

      setFile(null);
      alert("Uploaded successfully");
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="panel">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Upload</p>
          <h2>Add a new image</h2>
        </div>
      </div>

      <p className="subtitle">
        Choose a file and upload it to your personal gallery. The layout keeps the action
        simple and the reading flow clear.
      </p>

      <label className="upload-dropzone">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />
        <span className="upload-dropzone-copy">
          <strong>{file ? file.name : "Choose an image to upload"}</strong>
          <small>
            {file
              ? "Ready to send to Cloudinary and save in Firestore."
              : "Supports common image formats like JPG, PNG, and WebP."}
          </small>
        </span>
      </label>

      <div className="action-row">
        <button onClick={uploadImage} disabled={uploading || !file}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {file ? <p className="file-name">Selected file: {file.name}</p> : null}
    </div>
  );
}
