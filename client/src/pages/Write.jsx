import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Write Something ..."
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>STATUS</h1>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">

            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
  <h1>CATEGORY</h1>
  <div className="cat">
    <button
      className={cat === "art" ? "active" : ""}
      onClick={() => setCat("art")}
    >
      Art
    </button>
  </div>
  <div className="cat">
    <button
      className={cat === "science" ? "active" : ""}
      onClick={() => setCat("science")}
    >
      Science
    </button>
  </div>
  <div className="cat">
    <button
      className={cat === "technology" ? "active" : ""}
      onClick={() => setCat("technology")}
    >
      Technology
    </button>
  </div>
  <div className="cat">
    <button
      className={cat === "cinema" ? "active" : ""}
      onClick={() => setCat("cinema")}
    >
      Cinema
    </button>
  </div>
  <div className="cat">
    <button
      className={cat === "design" ? "active" : ""}
      onClick={() => setCat("design")}
    >
      Design
    </button>
  </div>
  <div className="cat">
    <button
      className={cat === "food" ? "active" : ""}
      onClick={() => setCat("food")}
    >
      Food
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Write;
