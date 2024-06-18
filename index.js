//import express module
import express from 'express'; 
//import fs module
import fs, { read, write } from 'fs';

import bodyParser from 'body-parser';
app.use(bodyParser.json());



//read a file
const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return JSON.parse(data) ;
    }
    //if there is an error it is captured and printed in the console
    catch(error){
        console.log(error);
    }};

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    }
    //if there is an error it is captured and printed in the console
    catch(error){
        console.log(error);
    }
}

//execute la funcion readData
readData();

//create instance of express
const app = express();


//with app.get for index view
app.get("/",(req,res)=>{
    res.send("Welcome to the api Crud");
});

//with app.get for read all customers
app.get("/customer",(req,res)=>{
    const data = readData();
    res.json(data.customer);
});

//with app.get for read one customer
app.get("/customer/:id",(req,res)=>{
    const data = readData();
    const id = parseInt (req.params.id);
    const customer = data.customer.find(customer => customer.id === id);
    res.json(customer);
});

app.post("/customer",(req,res)=>{
    const data = readData();
    const body = req.body;
    const newCustomer = {
        id: data.customer.length + 1,
        ...body,
    }
    data.customer.push(newCustomer);
    writeData(data);
    res.jsom(newCustomer);
    res.json(customer);
});

app.put("/customer/:id",(req,res)=>{
    const data = readData();
    const body = req.body;
    const id = parseInt (req.params.id);
    const customerIndex = data.customer.findIndex(customer => customer.id === id);
    data.customer[customerIndex] = {
        ...data.customer[customerIndex],
        ...body,
    };
    writeData(data);
    res.json({menssage: "Customer updated"});

});


app.delete("/customer/:id",(req,res)=>{
    const data = readData();
    const id = parseInt (req.params.id);
    const customerIndex = data.customer.findIndex(customer => customer.id === id);
    data.customer.splice(customerIndex,1);
    writeData(data);
    res.json({menssage: "Customer deleted"});


});

//Definir una ruta
app.listen(3000,()=>{

    console.log("Servidor iniciado en el puerto 3000");

});