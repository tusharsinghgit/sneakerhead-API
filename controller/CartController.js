const BASE_URL = 'http://192.168.17.250:5000/uploads';

const Cart = require('../model/Cart');
const Product = require('../model/Product');

const getAllCartItems = async(req,res) => {

    try {
        const { user_id } = req.params;

        const cartItems = await Cart.find({ user_id }).populate('product_id');

        cartItems.forEach(item => {
            if (item.product_id && item.product_id.images) {
                item.product_id.images = item.product_id.images.map(image => `${BASE_URL}/${image}`);
            }
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
}

const addCartItem = async(req,res) => {

    try {
        const { user_id, product_id, size, quantity } = req.body;

        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cartItem = await Cart.findOne({user_id, product_id, size });

        if (cartItem) {

            cartItem.quantity += quantity;

        } else {

            cartItem = new Cart({ user_id, product_id, size, quantity });
        }

        await cartItem.save();

        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
}

const updateCartItem = async(req,res) => {
    try{
        const {user_id, product_id, size, quantity} = req.body;

        const cartItem = await Cart.findOne({user_id, product_id, size});

        if(!cartItem){
            return res.status(400).json({message : 'Cart Item not found'});
        }

        cartItem.quantity += quantity;

        await cartItem.save();
        res.status(200).json({ message: 'Cart Item updated successfully', cartItem});
    }catch(err){
        confirm.error(err);
        res.status(500).json({ message: 'Failed to update the Cart Item'});
    }
}

const removeCartItem = async(req,res) => {
    try{

        const {user_id, product_id, size } = req.body
        
        const result = Cart.deleteOne({ user_id, product_id, size });

        if((await result).deletedCount === 0){
            return res.status(404).json({ message: 'Cart Item Not Found'});
        }

        res.status(200).json({ message: 'Cart Item Deleted Successfully'});

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to remove Cart Item'});
    }
};

const clearCart = async (req,res) => {
    try{
        const { user_id } = req.params;

        await Cart.deleteMany({ user_id });
        res.status(200).json({ message: 'Cart cleared successfully' });
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Failed to clear cart' });
    }
}

module.exports = {
    getAllCartItems,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart,
}