import React, { useEffect,useState } from 'react'
import './style.scss'
import ViewDocument from './document/Document'
import { callServer,callServerFile } from '../../utils/helper'
import  axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

function Wrapper({user}) {
    const [documentName, setDocumentName] = useState('');
    const [file, setFile] = useState(null);
    const [remark, setRemark] = useState('');

    const [docList, setDocList] = useState([]);


    const loadData =async()=>{
        const formData = {
            "userName":user.userName,
        }
        const response = await callServer('post','/documents',formData);
        console.log(response)
        if(response.documentList!=null)
        setDocList(response.documentList);
    }
    useEffect(()=>{
        loadData();
    },[])

    const addDocument = async(e)=>{
        e.preventDefault()
        const formData = new FormData();

        formData.append('documentName', documentName);
        formData.append('file', e.target.file.files[0]);
        formData.append('remark', remark);
        formData.append('userName', user.userName);

        console.log(formData.get('documentName'))
        console.log(formData.get('file'))

        const response = await callServerFile('post','/addDocument',formData);
        console.log(response)
        loadData();
        
    }

  return (
    
    <div className='wrapper'>
        <div className='addDocument'>
        <form onSubmit={addDocument} method='post' encType='multipart/form-data'>
            <label htmlFor="documentName">Enter Document Name</label>
            <input name='documentName' id='documentName' type="text" value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}} />
            <label htmlFor="remark">Enter version remark</label>
            <input name='remark' id='remark' type="text" value={remark} onChange={(e)=>{setRemark(e.target.value)}}/>
            <label htmlFor="file">Choose a file</label>
            <input name='file' id='file' type="file"  onChange={(e)=>{setFile(e.target.value)}}/>
            <button type='submit'>Add</button>
        </form>
        </div>
        {docList.length!=0 &&
            docList.map((doc)=>{
                return (<ViewDocument key={doc.docID} doc={doc}/>)
            })
        }

    </div>
  )
}

export default Wrapper
