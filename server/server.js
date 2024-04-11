
import express from 'express';
import { v5 } from 'uuid';
// import { create } from 'ipfs';
// const ipfs = create();
import {create} from 'ipfs-http-client'
import { Web3 } from 'web3';
import cors from 'cors';
import jwt from "jsonwebtoken";
import multer from 'multer'
import User from './database.js';
import fs from 'fs';
// import {getStreamAsBuffer} from 'get-stream'
// import getStream from 'get-stream'

import 'dotenv/config';

import bodyParser from 'body-parser';
const ipfs = create({ host: 'localhost', port: '5001' });
// const ipfs = await create();

const port = process.env.port || 3000;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
async function isIpfsRunning() {
    try {
      const version = await ipfs.version();
      console.log("IPFS is running. Version:", version);
      return true;
    } catch (error) {
      console.error("Error: Could not connect to IPFS node. Is it running?");
      return false;
    }
}

  isIpfsRunning();

async function uploadToIPFS(fileBuffer) {
    try {
        const added = await ipfs.add(fileBuffer);
        const ipfsHash = added.cid.toString();
        console.log('File uploaded to IPFS:', ipfsHash);
        return ipfsHash;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}
async function fetchFromIPFS(ipfsHash){

    try {
        const file = await ipfs.files.get(ipfsHash);
        const content = await file.content();
        return content;
        // res.contentType(file.cid.string); // Set appropriate content type
        // res.send(content);
    } catch (error) {
        console.error(error);
        return ('Error fetching file');
    }
}



import MyContract from "../Smart_Contract/artifacts/contracts/DocuVerse.sol/DocuVerse.json" with { type: "json" };
import authMiddleWare from './middleWares/authMiddleWare.js';
import { version } from 'mongoose';

const contractAddress = process.env.CONTRACT_ADDRESS;
const accountAddress = process.env.ACCOUNT_ADDRESS;
console.log("contract ",contractAddress);
const myContract = new web3.eth.Contract(MyContract.abi, contractAddress);



app.post('/createUser', async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(req.body, userName, req.body.password);
    try {
        const user = await User.findOne({
            userName: userName
        })

        if (user == null) {
            const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            const userID = v5(userName, MY_NAMESPACE);
            const newUser = new User({
                userName: userName,
                password: password,
                userID: userID
            });
            await newUser.save();
            const result = await myContract.methods.addUser(newUser.userName, newUser.userID).send({from:accountAddress})
            console.log("results from smart contract creation:",result);
            return res.send({
                success: true,
                message: "user is created",
            });

        }
        else {
            console.log("User already existed");
            return res.send({
                success: false,
                message: "UserName is already exist try different user name",
            });

        }
    }
    catch (error) {
        return res.send({
            sucess: false,
            message: error.message,
        });
    }

})
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' });

app.post('/addDocument',authMiddleWare,upload.single('file'),async(req,res)=>{
    console.log("add document req");
    console.log(req.body)
     
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try{

        const user = await User.findOne({userName:req.body.userName});
        if(!user){
            res.send({
                success:false,
                message:"please login again, user is not found"
            })
        }
        const fileBuffer = await req.file.buffer;
        
        const ipfsHash = await uploadToIPFS(fileBuffer);

        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const docID = v5(req.body.documentName+ipfsHash+req.body.remark, MY_NAMESPACE);

        console.log("ipfs hash:",ipfsHash);
        console.log("userID:", user.userID);
        console.log("documentID:", docID)
        const response = await myContract.methods.addDocument(ipfsHash,req.body.documentName,docID,req.body.remark,user.userID).send({from:accountAddress,gas:9000000});
        console.log("response from addDocument in smart contract",response);
        
        const data = {
            success:true,
            documentList:[{docID:docID,docName:req.body.documentName,versionList:[{ipfsHash:ipfsHash,
                remark:req.body.remark,
                timestamp:null}]}]
        }
        res.send({
            message:"Document Added Successfully",
            success:true,
            data:data
        });

    }
    catch(error){
        console.log(error);
        res.send({
            success:false,
            message:error.message
        })
    }

})

app.post('/addVersion',authMiddleWare,upload.single('file'),async(req,res)=>{
    console.log("add Version req");
    console.log(req.body)
     
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try{

        const user = await User.findOne({userName:req.body.userName});
        if(!user){
            res.send({
                success:false,
                message:"please login again, user is not found"
            })
        }
        const fileBuffer = await req.file.buffer;
        
        const ipfsHash = await uploadToIPFS(fileBuffer);


        console.log("ipfs hash:",ipfsHash);
        console.log("userID:", user.userID);
        console.log("documentID:", req.body.docID)
        const response = await myContract.methods.updateDocument(ipfsHash,req.body.docID,req.body.remark,user.userID).send({from:accountAddress,gas:9000000});
        console.log("response from updateDocument in smart contract",response);

        const data ={
            timestamp:null,
            remark:req.body.remark,
            ipfsHash:ipfsHash,
        };

        res.send({
            message:"New Version of Document Added Successfully",
            data:data,
            success:true
        });

    }
    catch(error){
        console.log(error);
        res.send({
            success:false,
            message:error.message
        })
    }

})



app.post('/signIn', async (req, res) => {
    try {
        // console.log(req.body);
        let user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            return res.send({
                success: false,
                message: "user not found",
            });
        }

        const validPassword = (req.body.password == user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid passward",
            });
        }

        const token = await jwt.sign({ userID: user.userID }, process.env.JWT, { expiresIn: '1d' });
        return res.send({
            success: true,
            message: "User logged in sucessfully",
            data: token,
        })
    } catch (error) {
        return res.send({
            sucess: false,
            message: error.message,
        });
    }
})




app.post('/documents',authMiddleWare, async (req, res) => {

    try {
        console.log("user requested for document",req.body.userName);
        let user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            return res.send({
                success: false,
                message: "user not found",
            });
        }
        console.log("userID requested all documents",user.userID)
        const response = await myContract.methods.getDocuments(user.userID).call((error, result) => {
            if (error) {
                console.error('Error calling smart contract function:', error);
            } else {
                console.log('Function call result:', result);
            }
        });
        const formattedDocList = response.docList.map(doc => ({
            docID:doc.docID,
            docName:doc.docName,
            versionList: doc.versionList.map( version=>({
                timestamp:Number(version.timsstamp),
                remark:version.remark,
                ipfsHash:version.ipfsHash
            }))
        }));
        console.log("smart contract return Document List",formattedDocList);
        res.send({
            success:true,
            documentList:formattedDocList
        })

    }
    catch(error){
        console.log(error)
        return res.send({
            success: false,
            message: error.message,
        });
    }
    
})


app.listen(port, () => {
    console.log("Server Started At Port:" + port);
});