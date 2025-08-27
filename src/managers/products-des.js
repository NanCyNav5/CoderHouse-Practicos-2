import fs from 'fs';


class Products{
    constructor(path){
        this.path = path;
    }


async getProducts(){
    if(fs.existsSync(this.path)){
        const products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    }
    return [];
}


async getProductById(id){
    try{
        const products = await this.getProducts();
        const product = products.find(p => p.id === Number(id));
        if(!product) throw new Error('Product not found');
        return product;
    } catch (error) {
        throw error;
    }
}

generateRandomId(products) {
    let id;
    do{
        id = Math.floor(Math.random() * 10000);
    } while(products.some(product => product.id === id));
    return id;
}

async addProduct({title,description,code,price,status,stock,category,thumbnails}){
    const products = await this.getProducts();
    const newProduct = {
        id: this.generateRandomId(products),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
}


async update(obj, id) {
        try {
            const products = await this.getProducts();
            let productExists = await this.getProductById(id);
            productExists = { ...productExists, ...obj };
            const newArray = products.filter((u) => u.id !== Number(id));
            newArray.push(productExists);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
            return productExists;
        } catch (error) {
            throw error;
        }
    }

    async deleteP(id) {
        try {
            const products = await this.getProducts();
            const productExists = await this.getProductById(id);
            const newArray = products.filter((u) => u.id !== Number(id));
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
            return productExists;
        } catch (error) {
            throw error;
        }
    }
}
export const productsManager = new Products("./data/products.json");