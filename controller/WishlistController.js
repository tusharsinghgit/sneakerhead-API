// const BASE_URL = 'http://192.168.17.250:5000/uploads';

const BASE_URL = process.env.BASE_URL || 'https://sneakerhead-api.vercel.app/uploads';

const Wishlist = require('../model/Wishlist');
const Product = require('../model/Product');

const getWishlistItems = async(req,res) => {
    try{

        const { user_id } = req.params;

        const wishlistItems = await Wishlist.find({ user_id}).populate('product_id');

        wishlistItems.forEach(item => {
            if (item.product_id && item.product_id.images) {
                item.product_id.images = item.product_id.images.map(image => `${BASE_URL}/${image}`);
            }
        });

        res.status(200).json(wishlistItems);

    } catch(err){
        console.error(err);
        res.status(500).json({ message : 'Failed To Fetch Wishlist Items'});
    }
}

const addToWishlist = async(req,res) => {
    try{
        const {user_id, product_id} = req.body;

        const product = await Product.findById(product_id);

        if(!product){
            return res.status(404).json({ message: 'Product Not Found'});
        }

        const existingWishlistItem = await Wishlist.findOne({ user_id, product_id });

        if(existingWishlistItem){
            return res.status(400).json({ message: 'Product already in wishlist'});
        }

        const wishlistItem = new Wishlist({ user_id, product_id });

        await wishlistItem.save();

        res.status(200).json({ message : ' Product Added To Wishlist', wishlistItem});

    }catch(err){
        console.error(err);
        res.status(500).json({ message : 'Failed to add product to wishlist'});
    }
}

const removeWishlist = async(req, res) => {

    try{

        const { user_id, product_id } = req.body;

        const result = await Wishlist.deleteOne({ user_id, product_id});

        if( result.deletedCount === 0){
            return res.status(404).json({ message: 'Wishlist Item Not Found'});
        }

        res.status(200).json({ message : 'Wishlist Item Removed'});

    }catch(err){
        console.error(err);
        res.status(500).json({ message : 'Failed to remove Product from Wishlist'});
    }
}

module.exports = {
    getWishlistItems,
    addToWishlist,
    removeWishlist,
}