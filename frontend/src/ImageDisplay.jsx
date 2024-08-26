// src/pages/ImageDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { encode } from "base64-arraybuffer";

const ImageDisplay = () => {
  const { deviceId } = useParams();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/imageByDeviceId/${deviceId}`,
          {
            responseType: "arraybuffer", // To handle binary data
          }
        );

        // Convert the binary data to base64
        const base64 = encode(response.data);
        setImageUrl(`data:image/jpeg;base64,${base64}`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [deviceId]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Image from server" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
