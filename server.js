require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const router = require('./routes/admin/index_routes');
const userRoute = require('./routes/user_routes');
const indexRoute = require('./routes/user/indexroute');

async function main(){
    await mongoose.connect(process.env.MONGODG_PATH)
}
main()
    .then(() => {
        console.log("MongoDb Connected successfully... !");
    })
    .catch((err) => {
        console.log(err);
    })

server.use(express.json());

server.use('/api/admin', router);
server.use('/api/user', userRoute);
server.use('/api/user', indexRoute);

server.listen(port, () => {
    console.log('Server is running on port 1010');
})