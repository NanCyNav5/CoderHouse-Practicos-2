import { Router } from "express";
import { cartsManager } from "../managers/carts-des.js";
const router = Router();

export default router;

router.get('/', async (req,res) => {
    try{
        const carts= await cartsManager.getCarts();
        res.json(carts);
    } catch (error) {
        next(error);
    }
})

router.get('/:cid', async (req, res) => { try{
        const{id} = req.params;
        const cart = await cartsManager.getCartsById(id);
        res.json(cart);
    }catch (error){
        next(error);
        }
    
}); 

router.post('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    try {
        const updatedCart = await cartsManager.addProductToCart(cid, pid);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}
);