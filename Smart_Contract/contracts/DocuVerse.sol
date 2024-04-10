// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;


contract DocuVerse {

    struct documentVersion {
        uint256 timestamp;
        string remark;
        string ipfsHash;
    }

    struct Document {
        string documentName;
        uint256 latestVersion;
        uint256[] allVersionIDs;
        mapping(uint256 => documentVersion) versions; 
    }

    struct User {
        string userName;
        string[] allDocumentIDs;
        mapping(string => Document) documents; 
    }

    mapping(string => User) public users;
    mapping(string => bool) public register;

    event UserAdded(string userID, string userName);
    event DocumentAdded(string userID, string documentID, string documentName);
    event DocumentUpdated(string userID, string documentID, string versionRemark);

    function addUser(string memory _userName, string memory _userID) public {

        require(register[_userID] == false, "User is already registered");

        users[_userID].userName = _userName;
        register[_userID] = true;

        emit UserAdded(_userID, _userName);

    }

    function addDocument(string memory _ipfsHash, string memory _documentName, string memory _documentID, string memory _versionRemark, string memory _userID) public {
        
        require(register[_userID] == true, "User doesn't exist");


        users[_userID].allDocumentIDs.push(_documentID);

        users[_userID].documents[_documentID].documentName = _documentName;
        users[_userID].documents[_documentID].latestVersion = 1;
        users[_userID].documents[_documentID].allVersionIDs.push(1);
        users[_userID].documents[_documentID].versions[1].timestamp = block.timestamp;
        users[_userID].documents[_documentID].versions[1].remark = _versionRemark;
        users[_userID].documents[_documentID].versions[1].ipfsHash = _ipfsHash;
        
        emit DocumentAdded(_userID, _documentID, _documentName);

    }



    function updateDocument(string memory _ipfsHash, string memory _documentID, string memory _versionRemark, string memory _userID) public{

        require(register[_userID] == true, "User doesn't exist");

        uint256 lVersion = ++users[_userID].documents[_documentID].latestVersion;

        users[_userID].documents[_documentID].allVersionIDs.push(lVersion);
        users[_userID].documents[_documentID].versions[lVersion].timestamp = block.timestamp;
        users[_userID].documents[_documentID].versions[lVersion].remark = _versionRemark;
        users[_userID].documents[_documentID].versions[lVersion].ipfsHash = _ipfsHash;

        emit DocumentUpdated(_userID, _documentID, _versionRemark);

    }

    struct rvers{
        
        uint256 timestamp;
        string remark;
        string ipfsHash;
        
    }

    struct rdoc{
        string docID;
        string docName;
        rvers[] versionList;
    }
    struct UserDocInfo {
        rdoc[] docList;
        string[] allDocIDs;
    }

    function getDocuments (string memory _userID) public view returns (UserDocInfo memory){

        require(register[_userID] == true, "User doesn't exist");

        // users[_userID].documents;

        // rdoc[] memory docList;

        rdoc[] memory docList = new rdoc[](users[_userID].allDocumentIDs.length);

        for(uint256 i=0;i<users[_userID].allDocumentIDs.length;i++){

            string memory curDocID = users[_userID].allDocumentIDs[i];

            rdoc memory curDoc;
            uint256 latestVersion =users[_userID].documents[curDocID].latestVersion;
            curDoc.versionList= new rvers[] (latestVersion);


            curDoc.docName = users[_userID].documents[curDocID].documentName;
            curDoc.docID = curDocID;


            for(uint256 j=0;j<users[_userID].documents[curDocID].allVersionIDs.length;j++){
                rvers memory curVerse;
                uint256 curVerseID = users[_userID].documents[curDocID].allVersionIDs[j];


                curVerse.timestamp = users[_userID].documents[curDocID].versions[curVerseID].timestamp;

                curVerse.remark = users[_userID].documents[curDocID].versions[curVerseID].remark;

                curVerse.ipfsHash = users[_userID].documents[curDocID].versions[curVerseID].ipfsHash;

                // curDoc.versionList.push(curVerse);
                curDoc.versionList[j] = curVerse;
            }

            docList[i] = curDoc;

        }
            UserDocInfo memory userInfo;
            userInfo.docList = docList;
            userInfo.allDocIDs = users[_userID].allDocumentIDs;
            return userInfo;
    }
}