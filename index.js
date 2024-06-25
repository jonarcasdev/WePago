//import express module
import express from 'express'; 
//import fs module
import fs, { read, write } from 'fs';

import bodyParser from 'body-parser';
import fetch from 'node-fetch';

//create instance of express
const app = express();

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



//with app.get for index view
app.get("/",(req,res)=>{
    res.send("Welcome to the api Crud");
});

//with app.get for read all customers
app.get("/customers",(req,res)=>{
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

app.post("/customer/create",(req,res)=>{
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

app.put("/customer/:id/update",(req,res)=>{
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


app.delete("/customer/:id/delete",(req,res)=>{
    const data = readData();
    const id = parseInt (req.params.id);
    const customerIndex = data.customer.findIndex(customer => customer.id === id);
    data.customer.splice(customerIndex,1);
    writeData(data);
    res.json({menssage: "Customer deleted"});


});

// Proveedores
const url = 'https://staging.apiv2.tpaga.co/api/gateway_bill_payment/v1/utility_providers?per_page=1'; // Añadido el parámetro per_page=10 al final de la URL
fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic YWstdDltbjM0NW44M2llcXdyc3o0eHA4enRnZXR6bnI='
    }
})
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // o response.text() si esperas texto
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});



// Balance
const urlAuth = 'https://staging.apiv2.tpaga.co/api/gateway_bill_payment/v1/merchant/balance';
fetch(urlAuth, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic YWstdDltbjM0NW44M2llcXdyc3o0eHA4enRnZXR6bnI='
    }
})
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // o response.text() si esperas texto
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});


// bill to pay
const urlbilltopay = 'https://staging.apiv2.tpaga.co/api/gateway_bill_payment/v1/utility_providers/etb/bills/111100005555/';
fetch(urlbilltopay, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic YWstdDltbjM0NW44M2llcXdyc3o0eHA4enRnZXR6bnI='
    }
})
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // o response.text() si esperas texto
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});


//bill payments status
const urlbilltopaystatus = 'https://staging.apiv2.tpaga.co/api/gateway_bill_payment/v1/bill_payment_transactions/some-random-and-unique-token-944';
fetch(urlbilltopaystatus, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic YWstdDltbjM0NW44M2llcXdyc3o0eHA4enRnZXR6bnI='
    }
})
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // o response.text() si esperas texto
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});















//Definir una ruta
app.listen(3000,()=>{

    console.log("Servidor iniciado en el puerto 3000");

});