const express = require("express");
const router = express.Router();
const fs = require("fs")


//This is a controller
//Ideally controllers are created in sepeerated folder
var obj = {
    table:[]
};


var count1=0;

const outData = (h, v, t) => {

    //logging out the co-ordinates
     console.log("veloc = "+v.toFixed(2) +" Time t(x) = " + (t/10).toFixed(2) +" height(y) = " +h.toFixed(2))
    
    //Creating Data_Object
    const data = {
        time: (t/10).toFixed(2),
        veloc: v.toFixed(2),
        height: h.toFixed(2)
    };

    //Pusing the Data_Object into global obj
    obj.table.push(data);

    //Getting the number of Bounces
    if(data.height==0){
        count1++
    }
} 






//route to get co-ordinates, velocity result and number of bounces
router.get("/bouncount/:height", (req, res) => {

    var td = 0.1, h = parseInt(req.params.height), a = -9.8 * td, v = 0, lasth = h;
    var tenthT = 0;


    //Code to get the co-ordinates
    outData (h, v, 0);
    while ((h != 0) || (lasth != 0)) {
        lasth = h;
        if (h == 0)
            v = -0.9 * v;
        v = v + a;
        h = h + (v * td) + (a * td * td / 2);
        if (h < 0)
            h = 0;
        outData (h, v, tenthT++);
    }
    
    //Wrinting the data into json file    
    fs.writeFileSync("./1.json", JSON.stringify(obj), (err) => {
        console.log(err)
    })    
    

    res.json(
        fs.readFileSync("1.json").toString()
    )
       
   //printing BounceCount
   console.log("Number of bounces = "+count1);
 
           
})
    
    
    
    
    
    
    

    
    

    
    
    



module.exports = router