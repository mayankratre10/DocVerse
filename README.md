This is a Document Version Storage, a secure blockchain-based application.
Technology used:
React
Nodejs
Ganache (Ganache test network used during development)
Solidity for smart contract deployed in the test network

To run the application in the local environment
1: Fork the repository
2: Clone the repository in your local system
3: use npm i to install all dependencies in each folder client and server
4: Now deploy your smart contract in any blockchain network like Ethereum ( For testing purposes you can you ganache)
5: To deploy first create the .evn variable in your smart contract root and add
    PRIVATE_KEY: ( KEY FOR YOUR BLOCKCHAIN ACCOUNT)
    PROVIDER_URL: (RPC URL) 
6: In your smart contract root, Now use the command: npx hardhat ./scripts/deploy.js --network _networkName
    _networkName: Example Ganache or Ethereum

7: Now in the root of the server directory again create .env
  PRIVATE_KEY: account private key
  RPC_URL: RPC URL of network 
  CONTRACT_ADDRESS: you get after deployment
  ACCOUNT_ADDRESS: your blockchain account
  DATABASE_URL: use MongoDB atlas with the DataBase name as docverse
  JWT: Jwt secret key
  Now run the server using the command: npm run dev or npm run server

8: Now in your client folder, create .env
  VITE_SERVER_URL: put the server URL example ('http://localhost:3000')
  use the command: npm run dev, to run the client
👌
That's it.......😁
Thanks for using it.


Showcasing of Project:

Login Page:
![Screenshot (140)](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/fe782fe2-ce4e-4cbb-aa45-3b5f1fb3d710)


SignUp Page:
![Screenshot (139)](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/e2613c18-174f-488d-b722-630e00a57a47)


Home Page:
![Screenshot (135)](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/3fa19074-d563-4130-b4a3-f352ded19f23)

![Screenshot (137)](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/3c7dc8ce-8545-4ee8-ae83-d6d402a21de5)

![Screenshot (136)](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/2e508c89-35f5-4ab0-bff0-276138658f11)





