import React, { useState, useEffect } from "react";
import "./style.scss";
import Version from "./version/Version";
import { callServerFile } from "../../../utils/helper";

function Popup({ setPopupWindow, doc ,user}) {
  const [versList, setVersList] = useState([]);
  const [addVersePopup,setAddVersePopup] = useState(false);
  const [versionRemark,setVersionRemark] = useState("");
  const [error,setError] = useState("")

  useEffect(() => {
    setVersList(doc.versionList);
  });
  const addVersion = async(e)=>{
    e.preventDefault()
    const formData = new FormData();

    formData.append('file', e.target.file.files[0]);
    formData.append('remark', versionRemark);
    formData.append('userName', user.userName);
    formData.append('docID',doc.docID);

    console.log(formData.get('versionRemark'))
    console.log(formData.get('file'))

    const response = await callServerFile('post','/addVersion',formData);
    if(response.success==false){
        setError(error.message)
        setTimeout(() => {
            setError(false);
        }, 3000);
    }
    else{
      
    }
    console.log(response)
    
}

  return (
    <div className="window" >
      <div className="control">
        <button className="addversebtn" onClick={() => setAddVersePopup(true)}>
          Add New Document Version
        </button>
        <button className="close" onClick={() => setPopupWindow(false)}>Close</button>
      </div>
      {addVersePopup && (
        <div className="addVersion">
          <form
            onSubmit={addVersion}
            method="post"
            encType="multipart/form-data"
          >
            <label htmlFor="versionRemark">Enter Version Remark</label>
            <input
              name="versionRemark"
              id="versionRemark"
              type="text"
              value={versionRemark}
              onChange={(e) => {
                setVersionRemark(e.target.value);
              }}
            />
            <label htmlFor="file">Choose a file</label>
            <input
              name="file"
              id="file"
              type="file"
            />
            <button type="submit">Add</button>
            <button onClick={() => setAddVersePopup(false)}>
              Don't Want To Add
            </button>
            {error.length != 0 && <p className="error">{error}</p>}
          </form>
        </div>
      )}
      {versList.length != 0 &&
        versList.map((version, index) => {
          return <Version key={index} version={version} />;
        })}
    </div>
  );
}

export default Popup;
