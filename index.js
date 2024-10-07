const express =require("express")
const app = express();
const user = [{
    Name: "john",
    kidney:[{
        healthy: false
    },{
        healthy: true
    }]
}]
app.use(express.json());
app.get("/", function(req,res){
    const johnkidney =user[0].kidney;
    //  console.log(johnkidnes);
    const numberofkidney = johnkidney.length;
    let  noOfhealthy =0;
    for(let i=0;i<johnkidney.length;i++){
        if(johnkidney[i].healthy){
            noOfhealthy=noOfhealthy+1;
        }
    } 
    const noOfunhealthy = numberofkidney - noOfhealthy;
    res.send({
        numberofkidney,
        noOfhealthy,
        noOfunhealthy
    })
})
app.post("/", function(req,res){
    const toputheathyorunhealthy =req.body.toputheathyorunhealthy;
    user[0].kidney.push({
        healthy:toputheathyorunhealthy
    })
    res.json({
        msg:"Done!"
    })
})
app.put("/", function(req,res){
   for(let i=0;i<user[0].kidney.length;i++){
      user[0].kidney[i].healthy =true; 
   }
   res.json({});
})

//removing all unhealthy kidneys
app.delete("/", function(req, res) {
    // Run the logic only if at least one kidney is unhealthy
    if (IsAtleastOneUnhealthy()) {
        const newKidney = [];
        for (let i = 0; i < user[0].kidney.length; i++) {
            if (user[0].kidney[i].healthy) {
                newKidney.push({
                    healthy: true
                });
            }
        }
        user[0].kidney = newKidney;
        res.json({
            msg: "done!"
        });
    } else {
        // Use res.status() instead of res.Status()
        res.status(411).json({
            msg: "You have no bad kidney"
        });
    }
});

function IsAtleastOneUnhealthy(){
    let atUnhealthy =false;
    for(let i=0;i<user[0].kidney.length;i++){
        if(!user[0].kidney[i].healthy){
           atUnhealthy =true;
        } 
     }
    return atUnhealthy;
}
app.listen(3001);