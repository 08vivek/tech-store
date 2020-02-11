const router = require('express').Router();
let Products = require('../models/products.model');

router.route('/').get((req,res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const id = Number(req.body.id);
    const title = req.body.title;
    const price = Number(req.body.price);
    const description = req.body.description;
    const featured = req.body.featured;
    const image = Object(req.body.image);
    const category = req.body.category;
    const free_shipping = req.body.free_shipping;

    const newProducts = new Products({
        id,
        title,
        price,
        description,
        featured,
        image,
        category,
        free_shipping
    });
    //console.log(newProducts);
    newProducts.save()
        .then(() => res.json('Products added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

// router.route('/:id').get((req,res) => {
//     Products.findById(req.params.id)
//         .then(product => res.json(product))
//         .catch(err => res.status(400).json('Error: '+err));
// });

// router.route('/:id').delete((req,res) => {
//     Products.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Products deleted.'))
//         .catch(err => res.status(400).json('Error: '+err));
// });

// router.route('/update/:id').post((req,res) => {
//     Products.findById(req.params.id)
//         .then(product => {
//             product.username = req.body.username;
//             product.description = req.body.description;
//             product.duration = Number(req.body.duration);
//             product.date = Date.parse(req.body.date);

//             product.save()
//                 .then(() => res.json('Products updated!'))
//                 .catch(err => res.status(400).json('Error: '+err));
//         })
//         .catch(err => res.status(400).json('Error: '+err));
// });


module.exports = router;