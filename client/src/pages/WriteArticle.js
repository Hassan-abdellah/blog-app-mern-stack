import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { categories } from "../data";
import axios from "axios";
import Dropdown from "../components/dropdown/Dropdown";
const WriteArticle = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // submit the form
  const publishArticle = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/write", {
      //   desc: ReactHtmlParser(description),
      //   desc: description,
      title,
      cover,
      category: selected.toLowerCase(),
      description,
    });

    // const desc = await res.data.desc;
    // setBody(desc);
    const data = await res.data;
    setTitle("");
    setCover("");
    setSelected("");
    setDescription("");
    console.log(data.post);
    console.log(ReactHtmlParser(data.post.description));
    setPost(data.post);
  };
  return !previewMode ? (
    <div className="write" style={{ flexDirection: "column" }}>
      <form onSubmit={publishArticle} className="post-form">
        <div className="editor-container">
          <label>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="editor-container">
          <label>Cover Image:</label>
          <input
            type="text"
            id="cover-image"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <Dropdown
          carret="true"
          options={categories}
          label="Category"
          selected={selected}
          setSelected={setSelected}
        />
        <div className="editor-container">
          <label htmlFor="editor">Post Description:</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{
              ckfinder: {
                uploadUrl: 'http://localhost:5000/upload',
                // Enable the XMLHttpRequest.withCredentials property.
                withCredentials: true,
                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                  "X-CSRF-TOKEN": "CSFR-Token",
                  Authorization: "Bearer <JSON Web Token>",
                },
              },
            }}
            id="editor"
            className="ck-editor"
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
        <div className="buttons">
          <button className="btn" type="submit">
            Publish
          </button>
          {title && selected && description && cover && (
            <>
              <span>Or</span>
              <button
                className="btn"
                type="button"
                onClick={() => setPreviewMode(true)}
              >
                Preview Mode
              </button>
            </>
          )}
        </div>
      </form>
      <div>
        {/* {post && (
         // body.map((line) => {
        //   const parent = line.props.children[0];
        //   const child = parent?.props?.children[0];
        //   const secondChild = child?.props?.children[0];
        //   return (
        //     <line.type key={line.key}>
        //       {typeof parent === "string" ? (
        //         parent
        //       ) : (
        //         <parent.type>
        //           {typeof child === "string" ? (
        //             child
        //           ) : (
        //             <child.type>{secondChild}</child.type>
        //           )}
        //         </parent.type>
        //       )}
        //     </line.type>
        //   )
        // })  
        <>
            <div>Title: {post.title}</div>
            <div>Category: {post.category}</div>
            <div>Description: {ReactHtmlParser(post.description)}</div>
        </>
      )} */}
      </div>
    </div>
  ) : (
    <div className="post">
      {title && selected && description && cover && (
        <>
          <div className="post-img">
            <img src={cover} alt="post-cover" />
          </div>
          <div className="post-body">
            <h1 className="post-title">{title}</h1>
            <div className="post-desc">{ReactHtmlParser(description)}</div>
            {/* <div className="post-desc">{description}</div> */}
            {/* <p className="post-desc">{description}</p> */}

            <button
              className="btn cancel-preview-btn"
              onClick={() => setPreviewMode(false)}
            >
              Cancel Preview Mode
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WriteArticle;
