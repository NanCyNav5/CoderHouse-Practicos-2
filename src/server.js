import express from 'express';
import {productsManager} from './managers/products-des.js';
import { error } from 'console';
import { errorHandler } from './middlewares/error-handler.js';
import { cartsManager } from './managers/carts-des.js';
import productRouter from './routes/products-router.js';
import cartRouter from './routes/carts-router.js';
import handlebars from 'express-handlebars';
import { Server } from   'socket.io';
import viewRouter from './routes/views.router.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.engine('handlebars', handlebars.engine());
app.use(express.static(`${process.cwd()}/public`));
app.set('views',`${process.cwd()}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);   
app.use('/', viewRouter);
app.use(errorHandler);


const httpServer = app.listen(8080, () => console.log('Server is running on port 8080'));



const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado ${socket.id}`);
    });
    
    socket.emit('saludos desde el servidor', 'Bienvenido al servidor');
    socketServer.emit('productos', await productsManager.getProducts());
    socket.on('producto nuevo',async (prod)=>{
        await productsManager.addProduct(prod);
        const products= await productsManager.getProducts();
        socketServer.emit('productos', products);
    })

    socket.on('eliminar producto',async(id)=>{
        await productsManager.deleteP(id);
        const products= await productsManager.getProducts();   
        socketServer.emit('productos', products);
    })


});
