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
    const [error, setError] = useState("");

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

        if(documentName.length==0 || e.target.file.length==0 || remark.length==0){
            setError("Please Fill The Details");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

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
            <button className='addDocbtn' onClick={()=>{
                setAddDocPopup(!addDocPopup)}
        }>Add New Document</button>
        </div>
        {addDocPopup && <div className='addDocument'>
        <form onSubmit={addDocument} method='post' encType='multipart/form-data'>
            <div className='item'>
            <label htmlFor="documentName">Enter Document Name</label>
            <input name='documentName' id='documentName' type="text" value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}} />
            </div>
            <div className='item'>
            <label htmlFor="remark">Enter Version Remark</label>
            <input name='remark' id='remark' type="text" value={remark} onChange={(e)=>{setRemark(e.target.value)}}/>
            </div>
            <div className='item'>
            <label htmlFor="file">Choose a file</label>
            <input name='file' id='file' type="file"  onChange={(e)=>{setFile(e.target.value)}}/>
            </div>
            
            <div className='btn'>
                <button className='add' type='submit'>Add</button>
                {/* <button className='close' onClick={()=>setAddDocPopup(false)}>close</button> */}
            </div>
        {error.length!=0 && <p className='error'>{error}</p> }
        </form>
        </div>}
        {docList.length!=0 &&
            docList.map((doc)=>{
                return (<ViewDocument key={doc.docID} user={user} doc={doc} loadData={loadData} />)
            })
        }

    </div>
  )
}

export default Wrapper
