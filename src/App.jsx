import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("upload");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setActiveView("upload");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setActiveView("upload");
  };

  if (!user) {
    return (
      <div className="page-shell">
        <div className="app-frame auth-frame">
          <section className="hero-panel">
            <div className="hero-orb hero-orb-orange" aria-hidden="true" />
            <div className="hero-orb hero-orb-green" aria-hidden="true" />
            <div className="hero-orb hero-orb-violet" aria-hidden="true" />
            <p className="eyebrow">Personal cloud gallery</p>
            <h1 className="gradient-heading">
              Store your images in a gallery that feels calm, clean, and easy to browse.
            </h1>
            <p className="hero-copy">
              Upload photos in seconds, keep them organized per account, and review them in
              a polished visual grid.
            </p>
            <div className="hero-points">
              <span>Private per-user gallery</span>
              <span>Cloud upload workflow</span>
              <span>Clean image presentation</span>
            </div>
          </section>

          <section className="card auth-card">
            <h2>Welcome back</h2>
            <p className="subtitle">Log in to upload images and explore your gallery.</p>
            <Login />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="app-frame">
        <section className="hero-panel dashboard-hero">
          <div className="hero-orb hero-orb-orange" aria-hidden="true" />
          <div className="hero-orb hero-orb-green" aria-hidden="true" />
          <div className="hero-orb hero-orb-violet" aria-hidden="true" />
          <div className="hero-topline">
            <p className="eyebrow">Cloud Image Uploader</p>
            <button className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <h1 className="gradient-heading">
            Your image space, designed to be pleasant to read and nice to browse.
          </h1>
          <p className="hero-copy">
            Signed in as {user.email}. Switch between uploading and gallery mode without
            losing the calm, editorial feel of the interface.
          </p>

          <div className="tab-row">
            <button
              className={activeView === "upload" ? "tab-button active" : "tab-button"}
              onClick={() => setActiveView("upload")}
            >
              Upload Images
            </button>
            <button
              className={activeView === "gallery" ? "tab-button active" : "tab-button"}
              onClick={() => setActiveView("gallery")}
            >
              View Gallery
            </button>
          </div>
        </section>

        <section className="card content-card">
          {activeView === "upload" ? <Upload user={user} /> : <Gallery user={user} />}
        </section>
      </div>
    </div>
  );
}

export default App;
