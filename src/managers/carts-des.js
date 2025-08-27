import fs from 'fs';
class Carts {
    constructor(path) {
        this.path = path;
    }

    async addCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: this.generateRandomId(carts),
            products: []
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }
    generateRandomId(newCart) {
    let id;
    do{
        id = Math.floor(Math.random() * 10000);
    } while(newCart.some(newCart => newCart.id === id));
    return id;
}

async getCarts(){
    if(fs.existsSync(this.path)){
        const carts = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
    }
    return [];
}


    async getCartsById(id){
    try{
        const carts = await this.getProducts();
        const cart = carts.find(c=> c.id === Number(id));
        if(!product) throw new Error('Product not found');
        return product;
    } catch (error) {
        throw error;
    }
}


async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === Number(cid));
    if (!cart) throw new Error('Cart not found');

    const cartProduct = cart.products.find(p => p.id === Number(pid));
    if (cartProduct) {
    cartProduct.quantity += 1;
    } else {
    cart.products.push({ id: Number(pid), quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
}
}

export const cartsManager = new Carts("./src/data/carts.json");