const mongoose=require("mongoose")


const DBURL="mongodb://uzair:qguWxS6JUcp96gYq@ac-fz7vr0s-shard-00-00.crenx4w.mongodb.net:27017,ac-fz7vr0s-shard-00-01.crenx4w.mongodb.net:27017,ac-fz7vr0s-shard-00-02.crenx4w.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ffzh2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=abeez"
const ConnectDB=async (req,res)=>{
try {
    await mongoose.connect(DBURL);
    console.log("MongoDB is connected")
} catch (error) {
 console.log(" Disconnected Database")

}

}
module.exports={ConnectDB}