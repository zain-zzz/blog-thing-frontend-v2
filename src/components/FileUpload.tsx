import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebaseconfig";

const FileUpload = () => {
  const [file, setFile] = useState<any>("");
  const [filename, setFilename] = useState<string | null>("Choose File");
  const [uploadedFile, setUploadedFile] = useState<object>({});
  const [username, setusername] = useState<string | null>("");
  // const [id, setId] = useState<string>("");

  // function makeid(length: number) {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  let tempUsernameBool = true;

  async function getUsername() {
    fetch("http://localhost:3003/getUsername/" + auth.currentUser?.email)
      .then((res) => res.text())
      .then((text) => {
        //console.log(text);
        setusername(text);
      });
  }

  if (tempUsernameBool) {
    getUsername();
    tempUsernameBool = false;
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", `${username}`);
    try {
      const res = await axios.post("http://localhost:3003/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { filename, filePath } = res.data;

      setUploadedFile({ filename, filePath });
      
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log("There was a problem with the file");
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <br />

        <div>
          <input
            type="file"
            className="custom-file-input"
            onChange={onChange}
          />
        </div>

        <br />

        <input type="submit" value="upload" className="submit-button" />
      </form>
    </Fragment>
  );
};

export default FileUpload;
