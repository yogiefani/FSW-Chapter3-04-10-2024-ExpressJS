const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

// default = healt check
app.get("/", (req, res) => {
    res.status(200).json({
        "status" : "Success",
        "message" : "Application is running good.."
    })
})
// url /yogi
app.get("/yogi", (req, res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Ping Successfully !"
    })
})

//middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi   
// membuat middleware = our own middleware
app.use((req,res, next) => {
    res.status(404).json({
        "status": "Failed",
        "Message": "API not exist !!"
    })
})



app.listen("3000", () =>{
    console.log("start aplikasi di port 3000")
})
