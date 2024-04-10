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

    const [addDocPopup, setAddDocPopup] = useState(false);
    const [error, setError] = useState("error");

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
        if(response.success==false){
            setError(error.message)
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
        else{
            setAddDocPopup(false);
            loadData();
        }
        console.log(response)
        
    }

  return (
    
    <div className='wrapper'>
        <div className='control'>
            <button className='addDocbtn' onClick={()=>setAddDocPopup(true)}>Add New Document</button>
        </div>
        {addDocPopup && <div className='addDocument'>
        <form onSubmit={addDocument} method='post' encType='multipart/form-data'>
            <label htmlFor="documentName">Enter Document Name</label>
            <input name='documentName' id='documentName' type="text" value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}} />
            <label htmlFor="remark">Enter version remark</label>
            <input name='remark' id='remark' type="text" value={remark} onChange={(e)=>{setRemark(e.target.value)}}/>
            <label htmlFor="file">Choose a file</label>
            <input name='file' id='file' type="file"  onChange={(e)=>{setFile(e.target.value)}}/>
            <button type='submit'>Add</button>
            <button onClick={()=>setAddDocPopup(false)}>Don't Want To Add</button>
        {error.length!=0 && <p className='error'>{error}</p> }
        </form>
        </div>}
        {docList.length!=0 &&
            docList.map((doc)=>{
                return (<ViewDocument key={doc.docID} user={user} doc={doc} />)
            })
        }

    </div>
  )
}

export default Wrapper
