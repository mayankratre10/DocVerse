import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './style.scss'
function Document({doc}) {

  const [document, setDocument] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const latestVersion = doc.versionList[doc.versionList.length-1];
        const response = await axios.get('http://127.0.0.1:8080/ipfs/'+latestVersion.ipfsHash); // Use gateway URL

        console.log("ipfs file: ", response)
        // const { cid, type } = response.data; // Assuming response structure

        // // Fetch document content
        // const documentBlob = new Blob([response.data], { type }); // Create Blob for potential thumbnail generation

        // // Generate thumbnail (optional, library-specific)
        // let thumbnail;
        // // ... (code to generate thumbnail based on document type using a library like exif.js or file-type)

        // setDocument({ cid, type, thumbnail });
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
    <div className='document'>
      <img src=''/>
    </div>
  )
}

export default Document
