import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="pageNotFound container">
      <div className="card center" style={{ padding: "2rem" }}>
        <h1 className="title-xl" style={{ color: "#f87171" }}>
          Page Not Found :/
        </h1>
        <h3 className="muted">
          Try this Link:{" "}
          <Link to="/" className="link">
            Home Page
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default PageNotFound;
