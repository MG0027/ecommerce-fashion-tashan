const { Router } = require("express");
const Bag = require("../models/bag");
const router = Router();
const mongoose = require('mongoose');
const config = require('./config');



router.post('/add-to-bag', async (req, res) => {
    const { userId, productId, quantity, productName, productPrice, productImage } = req.body;

 
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
       
        let bag = await Bag.findOne({ userId });

        if (!bag) {
           
            bag = new Bag({
                userId,
                bagItems: [{ productId, quantity, productName, productPrice, productImage }],
            });
        } else {
          
            const itemIndex = bag.bagItems.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                
                bag.bagItems[itemIndex].quantity += quantity; 

                bag.bagItems[itemIndex].productName = productName;
                bag.bagItems[itemIndex].productPrice = productPrice;
                bag.bagItems[itemIndex].productImage = productImage;
            } else {
              
                bag.bagItems.push({ productId, quantity, productName, productPrice, productImage });
            }
        }

        await bag.save();
        res.status(200).json({ message: 'Item added to bag', bag });
    } catch (error) {
        console.error('Error adding item to bag:', error); 
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});



router.delete('/remove-from-bag', async (req, res) => {
    const { userId, productId } = req.body;
  
    try {

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);
  
     
        const bag = await Bag.findOne({ userId: userObjectId });
  
        if (!bag) {
            return res.status(404).json({ message: 'Bag not found' });
        }
  
        const originalLength = bag.bagItems.length;
  
        
        bag.bagItems = bag.bagItems.filter(
            (item) => item.productId && item.productId.equals(productObjectId) === false
        );
  
  
        if (originalLength === bag.bagItems.length) {
            return res.status(404).json({ message: 'Product not found in the bag' });
        }
  
    
        await bag.save();
  
        return res.status(200).json({ message: 'Item removed from bag', bag });
  
    } catch (error) {
        console.error('Error:', error); 
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });



router.get('/:id', async (req, res) => {
    try {
       
        const userId = new mongoose.Types.ObjectId(req.params.id);
        
        const bag = await Bag.findOne({ userId });

     
        if (!bag) {
            return res.status(404).json({ message: "Bag not found" });
        }

 
        const bagItems = bag.bagItems;
     

 
        return res.json(bagItems);
    } catch (error) {
        console.error('Error fetching bag items:', error); 
        return res.status(500).json({
            message: "An error occurred while fetching products",
            error: error.message,
        });
    }
});

router.delete('/clear', async (req, res) => {
    const { userId } = req.body;

    try {
        const bag = await Bag.findOne({ userId });

        if (!bag) {
            return res.status(404).json({ message: 'Bag not found' });
        }

        bag.bagItems = []; 
        await bag.save();

        return res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/create-checkout-session', async (req, res) => {
    console.log("Request received:", req.body);
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
    const { amount, currency } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Order Payment',
                        },
                        unit_amount: amount, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${config.frontendUrl}/success`,
            cancel_url: `${config.frontendUrl}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
module.exports = router;

