const router = require('express').Router();
const Orders = require('../models/orderstoproceed.model');

router.route('/orders_to_proceed').post((req,res) => {
    //console.log(req.body.cart);
    const user = Object(req.body.user);
    const total = Number(req.body.total);
    const products = Array(req.body.cart);

    const order = new Orders({
        user,
        products,
        total
    
    });
    //console.log(orders);

    order.save((err,ord) => {
        if(err){
            return res.send({
                success: false,
                message: 'Server error.'
            });
        }
        res.send({
            success: true,
            message: 'Order added'
        });
    });  
});
module.exports = router;