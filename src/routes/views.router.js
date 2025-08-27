import { Router } from 'express';
import { productsManager } from '../managers/products-des.js';
const router = Router();
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});

router.get('/Home', async (req, res) => {
    const products = [{
    "id": 6504,
    "title": "Cámara 4K",
    "description": "Alta resolución para grabaciones",
    "code": "CAM2025",
    "price": 48000,
    "status": true,
    "stock": 8,
    "category": "Tecnología",
    "thumbnails": [
    "camara.jpg"
    ]
}];

    
    res.render('Home', {products});
});

router.get('/productos', (req, res) => {
    const productos = [
    { nombre: "Manzana", precio: 100 },
    { nombre: "Banana", precio: 80 },
    { nombre: "Naranja", precio: 120 }
    ];

    res.render("productos", { productos });
});
export default router;
