import { Router } from "express";
import { productsManager } from "../managers/products-des.js"; 
const router = Router();

export default router;
router.get('/', async (req,res) => {
    try{
        const products= await productsManager.getProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
})
router.get('/:id', async (req, res, next) => {
    try{
        const{id} = req.params;
        const product = await productsManager.getProductById(id);
        res.json(product);
    }catch (error){
        next(error);
        }
    
}); 
router.post('/', async (req, res,next)=>{
    try{
        const newProduct= await productsManager.addProduct(req.body)
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const updatedProduct = await productsManager.update(req.body, id);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const deletedProduct = await productsManager.deleteP(id);
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
});
