import React, { useState, useEffect } from "react";

import { Document, Page } from "react-pdf";

import "./style.scss";
function ViewDocument({ doc }) {
  const [document, setDocument] = useState({ url: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

        setDocument({ url: url, type: blob.type });
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
    <div className="document">
      {document.url.length != 0 && document.type != "application/pdf" && (
        <img className="thumbnail" src={document.url} alt="NA" />
      )}
      {document.url.length != 0 && document.type == "application/pdf" && (
        <Document
          file={document.url}
          onLoadSuccess={console.log("file Loaded")}
          className={".thumbnail"}
        >
          <Page pageNumber={1} className={".thumbnail"}  width={192} height={256} renderAnnotationLayer={false} renderTextLayer={false} />
        </Document>
      )}
    </div>
  );
}

export default ViewDocument;
