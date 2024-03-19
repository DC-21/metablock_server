METABLOCK SERVER

Author: Chola Kuboko

Description:
This server provides a platform for verifying the originality of blockchain assets. It utilizes TypeScript, Node.js, and Express.js to deliver a robust and scalable solution. With authentication routes integrated, users can securely access the system to authenticate blockchain assets.

Clone repository:
git clone https://github.com/DC-21/metablock_server.git

cd metablock_server

Install dependencies by running following command:
npm install

Set up environment variables:

Create a .env file in the root directory and configure the following variables:

DATABASE_URL="postgresql://postgres:210440@localhost:5432/mydb?schema=dice_store"

# PORT = 1818;

ACCESS_TOKEN_SECRET = ""

ACTIVATION_SECRET= ""

Run Server:
npm run dev

Usage:
Once the server is up and running, you can access the following endpoints:

Authentication

The server uses JSON Web Tokens (JWT) for authentication. Upon successful login, the server issues a JWT token, which must be included in the headers of subsequent requests to authenticated endpoints. The token is generated using a secret key specified in the environment variables.

POST /api/auth/signup: Register a new user. Requires a JSON payload with username and password fields.

POST /api/auth/login: Login with existing credentials. Requires a JSON payload with username and password fields. Upon successful login, the server responds with a JWT token.

Blockchain Asset Originality Verification:

GET /api/verify/:assetId: Verify the originality of a blockchain asset. Replace :assetId with the ID of the asset you want to verify. This endpoint requires authentication, so include the JWT token obtained during login in the request headers.
