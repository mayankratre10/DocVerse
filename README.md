## Document Version Storage

This is a secure blockchain-based application for document version storage. The documents uploaded to IPFS and the hash values are stored in blockchain.
Here you can create your account, and add documents and for each document, you can add a new version of it. Images and PDF files are allowed.

**Technology Stack:**

* React
* Node.js
* Ganache (Test network for development)
* Solidity (Smart contract programming language)
* IPFS 

## Running the application locally

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system.
- Also Make sure you running IPFS in your local system, if you want to use remote IPFS, then change the IPFS URL in the server.js file

**Steps:**

1. **Fork and Clone the Repository:**
   - Fork the repository on GitHub.
   - Clone the forked repository to your local system:

     ```bash
     git clone [https://github.com/](https://github.com/)<your-username>/<your-repository-name>.git
     ```

2. **Install Dependencies:**
   - Navigate to the project root directory:

     ```bash
     cd <your-repository-name>
     ```

   - Install dependencies in both the `client` and `server` folders:

     ```bash
     npm install  # or yarn install
     ```

3. **Deploy the Smart Contract (Optional):**

   - (Optional) Create a `.env` file in the smart contract root directory.
   - Add the following environment variables to the `.env` file:
      ```
      PRIVATE_KEY: (Your blockchain account private key)
      PROVIDER_URL: (RPC URL of your blockchain network)
      ```
   - In the smart contract root directory, deploy the contract using the command:

     ```bash
     npx hardhat ./scripts/deploy.js --network _networkName
     ```

     Replace `_networkName` with the desired network (e.g., "ganache" or "ethereum").

4. **Configure Server Environment:**
   - Create a `.env` file in the server directory root.
   - Add the following environment variables to the `.env` file:
      ```
      PRIVATE_KEY: (Your blockchain account private key)
      RPC_URL: (RPC URL of your blockchain network)
      CONTRACT_ADDRESS: (Smart contract address obtained after deployment)
      ACCOUNT_ADDRESS: (Your blockchain account address)
      DATABASE_URL: (MongoDB Atlas connection string with database name "docverse")
      JWT: (JWT secret key)
      ```

   - Start the server using:

     ```bash
     npm run dev  # or npm run server
     ```

5. **Configure Client Environment:**
   - Create a `.env` file in the client directory root.
   - Add the following environment variable to the `.env` file:
      ```
      VITE_SERVER_URL: (Server URL, e.g., 'http://localhost:3000')
      ```

   - Start the client application using:

     ```bash
     npm run dev
     ```

## Project Showcase

**Login Page:**

![Login Page Screenshot](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/fe782fe2-ce4e-4cbb-aa45-3b5f1fb3d710)

**Signup Page:**

![Signup Page Screenshot](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/e2613c18-174f-488d-b722-630e00a57a47)

**Home Page:**

![Home Page Screenshot 1](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/3fa19074-d563-4130-b4a3-f352ded19f23)
![Home Page Screenshot 2](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/3c7dc8ce-8545-4ee8-ae83-d6d402a21de5)
![Home Page Screenshot 3](https://github.com/MAYANKRATRE10/DocVerse/assets/82997237/2e508c89-35f5-4ab0-bff0-276138658f11)

