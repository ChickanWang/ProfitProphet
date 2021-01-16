const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(5000, ()=>{
    console.log('express server started');
});