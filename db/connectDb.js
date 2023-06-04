const mongoose=require('mongoose');

const userName='utkarsh2237';
const password='4lKVSUT2f6ScG6lq';
const dbName='MSGAPP';
const ConnectDb=async()=>{
    try{
        const conn= await mongoose.connect(
            `mongodb+srv://${userName}:${password}@cluster1.9yqmnpn.mongodb.net/${dbName}
        ?retryWrites=true&w=majority`,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(conn.connection.host);
    }catch(err){
        console.log(err);
    }

}

module.exports=ConnectDb;
// export default ConnectDb;