const socket= io();
socket.on('saludos desde el servidor', (mensaje)=>{
    console.log(mensaje);

});

const form= document.getElementById('form');
const inputTitle= document.getElementById('title');
const inputDescription= document.getElementById('description');
const inputCode= document.getElementById('code');
const inputPrice= document.getElementById('price');
const inputStatus= document.getElementById('status');
const inputStock= document.getElementById('stock');
const inputCategory= document.getElementById('category');
const productos= document.getElementById('productos');

if (form){
    form.onsubmit= (e)=>{
    e.preventDefault();
    const titulo= inputTitle.value;
    const descripcion= inputDescription.value;
    const codigo= inputCode.value;
    const precio= inputPrice.value;
    const estado= inputStatus.value;
    const stock= inputStock.value;
    const categoria= inputCategory.value;

    socket.emit('producto nuevo', {
        title: titulo,
        description: descripcion,
        code: codigo,
        price: precio,
        status: estado,
        stock: stock,
        category: categoria
    });
    
};
}
    const EliminarProdu= (id)=>{
        socket.emit('eliminar producto', id);
    }
socket.on('productos',(array)=>{
    let infoProducts = ""
    array.forEach(prod => {
        infoProducts += `${prod.title} - ${prod.description} - ${prod.code} - ${prod.price} - ${prod.status} - ${prod.stock} - ${prod.category} <button onclick="EliminarProdu(${prod.id})"> Eliminar Producto </button> <br>`
    })
    productos.innerHTML= infoProducts;
    
});











