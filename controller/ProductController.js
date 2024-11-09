// const BASE_URL = 'http://192.168.17.250:5000/uploads';

const BASE_URL = process.env.BASE_URL || 'https://sneakerhead-api.vercel.app/uploads';

const Product = require('../model/Product');

const createProducts = async (req, res) => {
    const { name, brand, description, price, sizes, type } = req.body;

    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    console.log('Files:', req.files);

    try {
        // Check for required fields
        if (!name || !price || !brand || !description || !type || !sizes || !req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
        }

        // Extract file paths from req.files
        const images = Object.keys(req.files).map(key => req.files[key][0].filename);

        // Since sizes are fixed, you can directly use sizes from the request
        const parsedSizes = JSON.parse(sizes); // Parse sizes from JSON string if needed

        // Create new product with destructured fields
        const product = new Product({
            name,
            brand,
            description,
            price,
            images,
            sizes: parsedSizes, // Ensure sizes are in the correct format
            type,
        });

        // Save the product in the database
        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });

    } catch (error) {
        console.error('Error creating product:', error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create product',
        });
    }
};

const updateProduct = async (req, res) => {
    try {
      const { name, price, brand, description, type, sizes } = req.body;
  
      // Debug to check incoming sizes
    //   console.log("Sizes received from the frontend:", sizes);
  
      // Check and parse sizes only if it's a valid string
      let parsedSizes = [];
      if (sizes && typeof sizes === 'string') {
        try {
          parsedSizes = JSON.parse(sizes);
        } catch (error) {
          return res.status(400).json({ message: 'Invalid sizes format', error: error.message });
        }
      } else {
        parsedSizes = sizes; // Use as-is if it's already an array
      }
  
      // Handle images (newly uploaded + existing)
      let updatedImages = [];
  
      // Collect newly uploaded images from `req.files`
      if (req.files) {
        for (let i = 0; i < 5; i++) {
          if (req.files[`images[${i}]`]) {
            updatedImages[i] = req.files[`images[${i}]`][0].filename;
          }
        }
      }
  
      // Process existing images
      if (req.body.existingImages) {
        const existingImages = req.body.existingImages; // Assuming this is an array
        existingImages.forEach((image, index) => {
          if (image) {
            updatedImages[index] = image; // Keep the existing image if not removed
          }
        });
      }
  
      // Update product in the database
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          brand,
          description,
          type,
          sizes: parsedSizes, // Use parsed sizes
          images: updatedImages, // Update images
        },
        { new: true } // Return the updated product
      );
  
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  };
  


const deleteProduct = async(req,res) => {
    try{

        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product Not Found',
            })
        }
        res.status(200).json({
            success:true,
            message:'Product Deleted Successfully',
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:'Failed to delete Product',
        })
    }
}

const getAllProducts = async (req,res) => {

    try{
        const products = await Product.find();
        products.forEach(product => {
            product.images = product.images.map(image => `${BASE_URL}/${image}`);
        });
        res.json(products);

    }catch(err){
        res.status(500).json({message:err.message});
    }

};

const getDistinctProducts = async (req, res) => {
    try {
        
        const brands = await Product.find().distinct("brand");

        const products = await Promise.all(
            brands.map(async (brand) => {
                const product = await Product.findOne({ brand });
                if (product && product.images) {
                    product.images = product.images.map(image => `${BASE_URL}/${image}`);
                }
                return product;
            })
        );

        res.json(products.filter(product => product !== null));

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getProductsByBrand = async (req,res) => {

    try{
        const { brand } = req.query;
        const products = await Product.find({brand});
        products.forEach(product => {
            product.images = product.images.map(image => `${BASE_URL}/${image}`);
        });
        res.json(products);

    }catch(err){
        res.status(500).json({message:err.message});
    }

};

const getCollabProducts = async(req,res) => {

    try{
        const products = await Product.find({type:'collab'});
        products.forEach(product => {
            product.images = product.images.map(image => `${BASE_URL}/${image}`);
        });
        res.json(products);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const getProductById = async(req,res) => {

    try{
        const { id } = req.params;
        const products = await Product.findById(id);
        
        products.images = products.images.map(image => `${BASE_URL}/${image}`);
        
        if(!products){
            return res.status(404).json({message:'Product Not Found'});
        }
        res.json(products);
    }catch(err){
        console.error('Error Fetching Product:',err);
        res.status(500).json({message:'Server Error'});
    }
}

module.exports = {
    getAllProducts,
    getDistinctProducts,
    getProductsByBrand,
    getCollabProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct,
};