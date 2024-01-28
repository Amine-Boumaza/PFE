import React from "react";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div>
      this is Category
      <Link to="/" className="underline">
        "go to dashboard"
      </Link>
    </div>
  );
}
