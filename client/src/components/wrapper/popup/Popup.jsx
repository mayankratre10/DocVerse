import React, { useState, useEffect } from "react";
import "./style.scss";
import Version from "./version/Version";
import { callServerFile } from "../../../utils/helper";

function Popup({ setPopupWindow, doc ,user,loadData}) {
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
    if(versionRemark.length==0 || e.target.file.length==0){
      setError("Please Fill The Details");
      setTimeout(() => {
          setError("");
      }, 3000);
      return;
    }

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
      setAddVersePopup(false);
      loadData();
    }
    console.log(response)
    
}


  return (
    <div className="window" >
      <div className="control">
        <button className="addversebtn" onClick={() => setAddVersePopup(!addVersePopup)}>
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
            <div className="item">
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
            </div>
            <div className="item">
            <label htmlFor="file">Choose a file</label>
            <input
              name="file"
              id="file"
              type="file"
            />
            </div>
            <div className="btn">
              <button className="add" type="submit">Add</button>
              {/* <button onClick={() => setAddVersePopup(false)}>
                Don't Want To Add
              </button> */}
            </div>
            {error.length != 0 && <p className="error">{error}</p>}
          </form>
        </div>
      )}
      {versList.length != 0 &&
        versList.map((version, index) => {
          return <Version key={index} version={version} loadData={loadData} />;
        })}
    </div>
  );
}

export default Popup;
