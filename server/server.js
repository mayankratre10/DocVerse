
import express from 'express';
import {v5} from 'uuid';
import {create} from 'ipfs';
const ipfs = create();
import {Web3} from 'web3';
import cors from 'cors';
import jwt from "jsonwebtoken";

import User from './database.js';

import 'dotenv/config';

import bodyParser from'body-parser';


const port = process.env.port || 3000;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


async function uploadToIPFS(file) {
    const added = await ipfs.add(file);
    return added.cid.string;
  }


import MyContract from "../Smart_Contract/artifacts/contracts/DocuVerse.sol/DocuVerse.json" with { type: "json" };
import authMiddleWare from './middleWares/authMiddleWare.js';

const contractAddress = process.env.CONTRACT_ADDRESS; 
// const myContract = new web3.eth.Contract(MyContract.abi, contractAddress);



app.post('/createUser',async (req,res)=>{
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(req.body,userName,req.body.password);
    try{
        const user= await User.findOne({
            userName: userName
        })
    
        if(user==null){
            const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            const userID = v5(userName,MY_NAMESPACE);
            const newUser = new User( {
                userName: userName,
                password: password,
                userID: userID
            });
            await newUser.save();
            // const result = await myContract.methods.addUser(userName, userID);
            // console.log("results from smart contract:",result);
            return res.send({
                success: true,
                message: "user is created",
            });
            
        }
        else{
            console.log("User already existed");
            return res.send({
                success: false,
                message: "UserName is already exist try different user name",
            });
            
        }
    }
    catch(error){
        return res.send({
            sucess:false,
            message: error.message,
        });
    }
    
})

// app.post('/addDocument',authMiddleWare,async(req,res)=>{

//     console.log(req);

//     if (!req.files) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }
//     try{

//         const file = req.files.file;
//         const ipfsHash = await uploadToIPFS(file.data);

//         const user = await User.find({userName:req.data.userName});
//         console.log(ipfsHash);
//         const result = await myContract.methods.addDocument(ipfsHash,req.data.documentName,req.data.documentID,req.data.remark,user.userID);

//         console.log("results from smart contract:" +result);

//         res.send("Document Successfully Added");

//     }
//     catch(error){
//         console.log(error.message);
//     }
    
    
// })

app.post('/signIn',async(req,res)=>{
    try {
        const user =await User.findOne({userName: req.body.userName});
        if(!user){
            return res.send({
                success: false,
                message: "user not found",
            });
        }
        
        const validPassword = (req.body.password == user.password);
        if(!validPassword){
            return res.send({
                success:false,
                message:"Invalid passward",
            });
        }

        const token =await jwt.sign({userID: user.userID},process.env.JWT,{expiresIn: '1d'});
        return res.send({
            success: true,
            message:"User logged in sucessfully",
            data: token,
        })
    } catch (error) {
        return res.send({
            sucess:false,
            message: error.message,
        });
    }
})

app.get('/documents',authMiddleWare,async(req,res)=>{

})


app.listen(port,()=>{
    console.log("Server Started At Port:"+port);
});