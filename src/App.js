import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import FileBase64 from "react-file-base64";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const imagesArray = [];

    const images = await axios.get(
      "http://52.5.72.137:3000/adminimages/61937e3f851ac8d517f83818"
    );

    for (let i = 0; i < images.data.data.length; i++) {
      const file = images.data.data[i].image;
      const data = await fetch(file);
      const blob = await data.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (readerEvt) => {
        const base64data = readerEvt.target.result;
        var arr = base64data.split(",");
        var base64 = arr[arr.length - 1];
        imagesArray.push(base64);
      };
    }
    setFiles(imagesArray);
  };

  return (
    <div>
      <h1>Client is perfectly Setup & Running</h1>
      {files.map((setting) => (
        <img
          src={`data:image/png;base64,${setting}`}
          style={{ width: "150px", height: "100px" }}
        />
      ))}
    </div>
  );
}

export default App;
