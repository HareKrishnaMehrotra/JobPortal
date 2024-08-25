import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "khazaana" //database name
    }).then(()=>{
        console.log("Connection to khazaana dB successful.")
    }).catch(err=>{
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}