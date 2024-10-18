const mongoose = require('mongoose');
const Address = require('../model/UserAddress'); // Adjust the path as necessary

const addAddress = async (req, res) => {
    const { user_id, fullName, alternatePhone, pincode, flatNo, area, landmark, city, state } = req.body;

    try {
        const newAddress = new Address({
            user_id, fullName, alternatePhone, pincode, flatNo, area, landmark, city, state
        });

        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress); // Changed to 201 Created
    } catch (err) {
        console.error('Failed to add address:', err);
        res.status(500).json({ message: 'Failed to add address', err });
    }
};

const getAddress = async (req, res) => {
    const { user_id } = req.params;

    try {
        const addresses = await Address.find({ user_id });
        res.status(200).json(addresses);
    } catch (err) {
        console.error('Failed to fetch address:', err);
        res.status(500).json({ message: 'Failed to fetch address', err });
    }
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { fullName, alternatePhone, pincode, flatNo, area, landmark, city, state } = req.body;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            { fullName, alternatePhone, pincode, flatNo, area, landmark, city, state },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(updatedAddress);
    } catch (error) {
        console.error('Failed to update address:', error);
        res.status(500).json({ message: 'Failed to update address', error });
    }
};


const getAddressById = async(req,res) => {

    try{
        const { id } = req.params;
        console.log(id);
        const address = await Address.findById(id);
        if(!address){
            return res.status(404).json({message:'Address Not Found'});
        }
        res.json(address);
    }catch(err){
        console.error('Error Fetching Address:',err);
        res.status(500).json({message:'Server Error'});
    }
}

module.exports = {
    addAddress,
    getAddress,
    updateAddress,
    getAddressById
};
