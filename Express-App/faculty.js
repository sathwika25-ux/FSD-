import express from 'express';
const app=express();
app.use(express.json());
const faculty=[];
app.post("/faculty",(req,res)=>{
    const newFaculty=req.body;
    faculty.push(newFaculty);
    res.status(201).json({
        message:"Faculty member created successfully",
        data:newFaculty
    });
});
app.get("/faculty",(req,res)=>{
    res.status(200).json({
        message:"Data of faculty members fetched successfully",
        data:faculty
    });
});
app.get("/Faculty/:id",(req,res)=>{
    const facultyId=parseInt(req.params.id);
    const facultyMember=faculty.find((fac)=>fac.id===facultyId);
    if(facultyMember){
        res.status(200).json({
            message:"Faculty member details fetched successfully",
            data:facultyMember
        });
    }else{
        res.status(404).json({
            message:"Faculty member not found"
        });
    }
});
app.put("/faculty/:id",(req,res)=>{
    const facultyId=parseInt(req.params.id);
    const updateFaculty=req.body;
    const facultyIndex=faculty.findIndex((fac)=>fac.id===facultyId);
    if(facultyIndex!==-1){
        faculty[facultyIndex]={...faculty[facultyIndex],...updateFaculty};
        res.status(200).json({
            message:"Faculty member updated successfully",
            data:faculty[facultyIndex]
        });
    }else{
        res.status(404).json({
            message:"Faculty member not found"
        });
    }
});
app.delete("/faculty/:id",(req,res)=>{
    const facultyId=parseInt(req.params.id);
    const facultyIndex=faculty.findIndex((fac)=>fac.id===facultyId);
    if(facultyIndex!==-1){
        const deletedFaculty=faculty.splice(facultyIndex,1)[0];
        res.status(200).json({
            message:"Faculty member deleted successfully",
            data:deletedFaculty
        });
    }else{
        res.status(404).json({message:"Faculty member not found"});
    }
});
app.listen(4000,()=>{
    console.log("Server running on http://localhost:4000/faculty");
});