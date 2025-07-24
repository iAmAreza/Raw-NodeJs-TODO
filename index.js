
import http from 'http' 


import url from 'url'  

import dotenv from 'dotenv'
import { error } from 'console';

dotenv.config(); 

const todos = [];

const server = http.createServer((req,res) => {
    const parsedurl = url.parse(req.url,true); 
    const pathName = parsedurl.pathname; 
    const {method} = req;  

    res.setHeader('Content-Type','application/json'); 

    if(pathName === '/api/todos' && method === "GET"){ 
        res.write(JSON.stringify(todos)); 
        res.end();
    }
    else if(pathName.startsWith('/api/todos/') && method === "GET"){
        const id = pathName.split('/')[3];
        const todo = todos.find(todo => todo.id.toString() === id); 
        if(!todo){
            res.statusCode = 404; 
            res.write(JSON.stringify({message:'todo not found'})); 
            res.end();
        }
        else{
            res.write(JSON.stringify(todo)); 
            res.end();
        }
    } 

    else if(pathName === '/api/create-todo' && method== 'POST'){
        let body = ''; 
        req.on("data", (chunk) => {
            body += chunk; 
        })
        req.on("end", () => {
           try{

            const data = JSON.parse(body); 
            const newTodo = {
                id : Date.now(), 
                title : data?.title || "No Title", 
                completed : data?.completed || false,
            } 
            todos.push(newTodo); 
            res.statusCode = 201; 
            return res.end(JSON.stringify(newTodo)); 

           }catch(error){
              
            res.statusCode = 400; 
            return res.end(JSON.stringify({error : error.message}));

           }

        })
    } 
    else if(pathName.startsWith('/api/update-todo/') && method === "PUT"){
        const id = pathName.split('/')[3]; 
        const todo = todos.find(todo => todo.id.toString() === id); 
        if(!todo){
            res.statusCode = 404; 
            res.write(JSON.stringify({message:'todo not found'})); 
            res.end();
            return;
        } 
        let updatedData = ""; 
        req.on("data", chunk => {
            updatedData += chunk; 
        })
        req.on("end", () => {
            try{ 
                const data = JSON.parse(updatedData); 
                const updatedTodo = {
                    ...todo, 
                    ...data, 
                }
                const index = todos.findIndex(todo => todo.id.toString() === id); 
                todos[index] = updatedTodo; 
                res.statusCode = 200; 
                res.end(JSON.stringify(updatedTodo)); 
            }catch(error){
                res.statusCode = 400;
                res.end(JSON.stringify({error : error.message})); 
            }
        })
    }
    else if(pathName.startsWith('/api/delete-todo/') && method === "DELETE"){
        const id = pathName.split('/')[3]; 
        const todo = todos.find(todo => todo.id.toString() === id); 
        if(!todo){
            res.statusCode = 404; 
            res.write(JSON.stringify({message: 'Todo not found'}));
            res.end();
            return;
        }
        else {
            const index = todos.findIndex(todo => todo.id.toString() === id);
            const deletedTodo = todos.splice(index, 1)[0];
            res.statusCode = 200;
            res.write(JSON.stringify({
                message: 'Todo deleted successfully',
                deletedTodo: deletedTodo
            }));
            res.end();
        }
    }
})

const port = process.env.PORT 

server.listen(port,() => {
    console.log(`server is listen in port http://localhost:${port}`); 
})
