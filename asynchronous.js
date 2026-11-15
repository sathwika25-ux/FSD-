import fs from "fs";
const data1="fsdfsd";
fs.writeFile("hello.txt",'UTF-8',(error)=>{
    if(error){
        return console.log(error);
    }
    console.log("data written successfully");
    fs.readFile("hello.txt",'UTF-8',(error,readData)=>{
        if(error){
            return console.log(error);
        }
        console.log(readData);
    });
});