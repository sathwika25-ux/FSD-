 import http from 'http';
const server=http.createServer((req,res)=>{

    if(req.method==='POST' && req.url==='/students'){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Student Created</h1>");
        res.end();
    }else if(req.method==='GET' && req.url==='/students'){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Student List</h1>");
        res.end();
    }else if(req.method==='GET' && req.url==='/students/1'){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Student Details</h1>");
        res.end();
    }
    else if(req.method==='PUT' && req.url==='/students/1'){
         res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Student Updated</h1>");
        res.end();
    }else if(req.method==='DELETE' && req.url==='/students/1'){
         res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Student Deleted</h1>");
        res.end();
    }else{
         res.writeHead(404,{"Content-Type":"text/html"});
        res.write("<h1>404 not found</h1>");
        res.end();
    }
});
server.listen(4000,() => {
    console.log("Server running at http://localhost:4000/");
});

/**
 * create a student -POST http://4000/students
 * curl -X POST http://localhost:4000/students
 * 
 * Read all students-GET http://localhost:4000/students/1
 *  curl -X GET http://localhost:4000/students
 * 
 * Read student by id- GET http://localhost:4000/students/1
 *  curl -X GET http://localhost:4000/students/1
 * 
 * update student by id-PUT http://localhost:4000/students/1
 *  curl -X PUT http://localhost:4000/students/1
 * 
 * delete student-DELETE http://localhost:4000/students/1
 *  curl -X DELETE http://localhost:4000/students/1
 * 
 * 
 * use curl.exe if it is powershell,no need for command prompt
 */