import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-4 right-4 bg-white bg-opacity-30 rounded-lg shadow-md p-4">
      <p className="text-sm font-semibold">
        Data © <a href="http://osm.org/copyright">OpenStreetMap</a>{" "}
        contributors, ODbL 1.0.
      </p>
    </footer>
  );
}
