import express from 'express';
const app =express();
app.use(express.json());
const products=[];
app.post("/products",(req,res)=>{
    const newProduct=req.body;
    products.push(newProduct);
    res.status(201).json({message:"Product created successfully",data:newProduct});
});
app.get("/products",(req,res)=>{
    res.status(200).json({message:"Data of products fetched successfully",data:products});
});
app.get("/products/:id",(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find((prod)=>prod.id===productId);
    if(product){
        res.status(200).json({message:"Product details fetch successfully",data:product});
    }
    else{
        res.status(404).json({message:"Product not found"});
    }
});
app.put("/products/:id",(req,res)=>{
    const productId=parseInt(req.params.id);
    const updateProduct=req.body;
    const productIndex=products.findIndex((prod)=>prod.id===productId);
    if(productIndex!==-1){
        products[productIndex]={...products[productIndex],...updateProduct};
        res.status(200).json({message:"Product updated successfully",data:products[productIndex]});
    }
    else{
        res.status(404).json({message:"Product not found"});
    }
});
app.delete("/products/:id",(req,res)=>{
    const productId=parseInt(req.params.id);
    const productIndex=products.findIndex((prod)=>prod.id===productId);
    if(productIndex!==-1){
        const deletedProduct=products.splice(productIndex,1)[0];
        res.status(200).json({message:"Product deleted successfully",data:deletedProduct});
    }
    else{
        res.status(404).json({message:"Product not found"});
    }
});
app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000/products");
});