import http from 'http';
const students=[];
const server = http.createServer((req, res) => {
    const {method,url}=req;
    if (method==='POST' && url==='/students'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            const student=JSON.parse(body);
            students.push(student);
            res.writeHead(201,{"content-type":"application/json"});
            res.end(JSON.stringify(student));
        });
    }else if(method=='GET' && url==='/students'){
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(students));
    }
    else if(method=='GET' && url.startsWith('/students/')){
        const studentId=url.split('/')[2];
        const student=students.find(s=>s.id===parseInt(studentId));
        if(student){
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(student));
        }
    }else if(method=='PUT' && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            const updatedStudent=JSON.parse(body);
            const studentIndex=students.findIndex(s=>s.id===studentId);
            if(studentIndex!==-1){
                students[studentIndex]= {...students[studentIndex], ...updatedStudent};
                res.writeHead(200,{"content-type":"application/json"});
                res.end(JSON.stringify(students[studentIndex]));
            }else{
                res.writeHead(404,{"content-type":"application/json"});
                res.end(JSON.stringify({error:"Student not found"}));
            }
        });
    }else if(method=='DELETE' && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        const studentIndex=students.findIndex(s=>s.id===studentId);
        if(studentIndex!==-1){
            const deletedStudent=students.splice(studentIndex,1);
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(deletedStudent[0]));
        }else{
            res.writeHead(404,{"content-type":"application/json"});
            res.end(JSON.stringify({error:"Student not found"}));
        }
    }else{
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({error:"Endpoint not found"}));
    }
    });
    server.listen(4000,()=>{
        console.log("Server running at http://localhost:4000/");
    });
    