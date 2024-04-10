import React, { useState, useEffect } from "react";

import { Document, Page } from "react-pdf";

import "./style.scss";
function Version({ version }) {
  const [versionData, setVersionData] = useState({ url: "", type: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://127.0.0.1:8080/ipfs/" + version.ipfsHash
        );
        console.log("ipfs file: ", response);

        const blob = await response.blob();
        const file = new File([blob], "first", { type: blob.type });

        console.log("blob:", blob);
        const url = window.URL.createObjectURL(blob);

        setVersionData({ url: url, type: blob.type, remark: version.remark });
        console.log(versionData);
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
    <div className="verseData">
      <div className="versionData">
        {versionData.url.length != 0 && versionData.type != "application/pdf" && (
          <img className="thumbnail" src={versionData.url} alt="NA" onClick={()=>setPopupWindow(true)} />
        )}
        {versionData.url.length != 0 && versionData.type == "application/pdf" && (
          <Document
            file={versionData.url}
            onLoadSuccess={console.log("file Loaded")}
            className={".thumbnail"}
          >
            <Page
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
      <p className="docName">{versionData.remark}</p>
    </div>
    </>
  );
}

export default Version;
