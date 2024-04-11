import React, { useState, useEffect } from "react";

import { Document, Page } from "react-pdf";
import Popup from "../popup/Popup";

import "./style.scss";
function ViewDocument({ doc,user,loadData }) {
  const [document, setDocument] = useState({ url: "", type: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupWindow,setPopupWindow] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const latestVersion = doc.versionList[doc.versionList.length - 1];
        const response = await fetch(
          "http://127.0.0.1:8080/ipfs/" + latestVersion.ipfsHash
        );
        console.log("ipfs file: ", response);

        const blob = await response.blob();
        const file = new File([blob], "first", { type: blob.type });

        console.log("blob:", blob);
        const url = window.URL.createObjectURL(blob);

        setDocument({ url: url, type: blob.type, name: doc.docName });
        console.log(document);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {popupWindow && <Popup loadData={loadData} doc={doc} user={user} setPopupWindow={setPopupWindow}/>}
    <div className="docData">
      <div className="document">
        {document.url.length != 0 && document.type != "application/pdf" && (
          <img className="thumbnail" src={document.url} alt="NA" onClick={()=>setPopupWindow(true)} />
        )}
        {document.url.length != 0 && document.type == "application/pdf" && (
          <Document
            file={document.url}
            onLoadSuccess={console.log("file Loaded")}
            className={".thumbnail"}
            onClick={()=>setPopupWindow(true)}
          >
            <Page
              onClick={()=>setPopupWindow(true)}
              pageNumber={1}
              className={".thumbnail"}
              width={192}
              height={256}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        )}
      </div>
      <p className="docName">{document.name}</p>
    </div>
    </>
  );
}

export default ViewDocument;
