"use client";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

const demoPosts = [
  {
    id: "1",
    title: "Police presence during demonstration",
    city: "Madrid",
    country: "Spain",
    lat: 40.4168,
    lng: -3.7038,
    status: "Unverified",
    text: "Large police deployment observed near city center."
  },
  {
    id: "2",
    title: "Flooded streets after heavy rain",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    status: "Verified",
    text: "Multiple streets impassable following overnight rainfall."
  }
];

export default function Home() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: "#facc15",
          color: "#000",
          textAlign: "center",
          fontSize: "12px",
          padding: "4px"
        }}
      >
        Demo environment — simulated content
      </div>

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ latitude: 30, longitude: 0, zoom: 2 }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {demoPosts.map(post => (
          <Marker
            key={post.id}
            latitude={post.lat}
            longitude={post.lng}
            onClick={() => setSelected(post)}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background:
                  post.status === "Verified" ? "green" : "red"
              }}
            />
          </Marker>
        ))}
      </Map>

      {selected && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#000",
            color: "#fff",
            padding: "12px"
          }}
        >
          <strong>{selected.title}</strong><br />
          {selected.city}, {selected.country}<br />
          <em>{selected.status}</em>
          <p>{selected.text}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}  
