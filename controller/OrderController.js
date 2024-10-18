const BASE_URL = 'http://192.168.17.250:5000/uploads';

const Order = require('../model/Order');
const Product = require('../model/Product');

const addOrder = async (req, res) => {

    const {totalPrice, paymentMethod, userId, cartItems, addressId} = req.body;
    console.log('Request Body:', req.body);
    try{

        const newOrder = new Order({ 
            
            userId, totalPrice, paymentMethod, cartItems, addressId, status: paymentMethod === 'COD' ? 'Pending' : 'Processing',

        });

        await newOrder.save();

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            
            if (product) {
              const sizeIndex = product.sizes.findIndex(size => size.size === item.size);
              
              if (sizeIndex !== -1) {
                product.sizes[sizeIndex].quantity -= item.quantity;
      
                if (product.sizes[sizeIndex].quantity < 0) {
                  product.sizes[sizeIndex].quantity = 0;
                }
      
                await product.save();
              } else {

                console.log(`Size ${item.size} not found for product ${product._id}`);
              }
            } else {

                console.log(`Product ${item.product_id} not found`);
            }
        }

        res.status(201).json(newOrder);

    }catch(error){
        
        console.error('Error creating order:', error);
        res.status(500).send({ error: error.message });
    }
}

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params; 

  try {
      const orders = await Order.find({ userId })
          .populate('userId', 'name email') 
          .populate('cartItems.productId', 'name price images') 
          .populate('addressId', 'street city state zipCode');

      if (orders.length === 0) {
          return res.status(404).json({ success: false, message: 'No orders found for this user' });
      }

      orders.forEach(order => {
        order.cartItems.forEach(item => {
          if (item.productId && item.productId.images) {
            item.productId.images = item.productId.images.map(image => `${BASE_URL}/${image}`);
          }
        });
      });

      res.status(200).json({ success: true, data: orders });
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params; 

  try {
      const orders = await Order.findById(orderId)
          .populate('userId', 'name email')
          .populate('cartItems.productId', 'name price images')
          .populate('addressId', 'street city state zipCode');

      if (!orders) {
          return res.status(404).json({ success: false, message: 'Order not found' });
      }

      orders.cartItems.forEach(item => {
        if (item.productId && item.productId.images) {
          item.productId.images = item.productId.images.map(image => `${BASE_URL}/${image}`);
        }
      });

      res.status(200).json({ success: true, data: orders });

  } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).send({ error: error.message });
  }
};


const getAllOrders = async(req,res)=>{
  try{
    const orders = await Order.find().populate('userId','name email').populate('cartItems.productId', 'name price images').populate('addressId', 'street city state zipCode');

    if(!orders){
      return res.status(404).json({
        success:false,
        message:'Order Not Found',
      });
    }

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        if (item.productId && item.productId.images) {
          item.productId.images = item.productId.images.map(image => `${BASE_URL}/${image}`);
        }
      });
    });

    res.status(200).json({
      success:true,
      data:orders
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:'Failed to Get Products'
    })
  }
}

// const updateOrder = async(req,res) => {
//   const {orderId} = req.params;
//   const { totalPrice, paymentMethod, cartItems, addressId } = req.body;

//   try {

//     const order = await Order.findById(orderId);
//     if(!order){
//       return res.status(404).json({
//         success:false,
//         message: 'Order Not Found',
//       })
//     }

//     order.totalPrice = totalPrice || order.totalPrice;
//     order.paymentMethod = paymentMethod || order.paymentMethod;
//     order.addressId = addressId || order.addressId;
//     // order.status = paymentMethod === 'COD' ? 'Pending' : 'Processing';

//     if (cartItems) {
//       order.cartItems = cartItems; 
//     }

//     await order.save(); 
//     res.status(200).json({ success: true, message: 'Order updated successfully', data: order });
    
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).send({ error: error.message });
//   }
// }

module.exports = { addOrder, getAllOrders, getOrdersByUserId, getOrderById }