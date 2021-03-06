const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

// get products
router.get('/', (req, res, next) => {
	Product.find().select("name price _id").exec().then(docs => {
		const response = {
			count: docs.length,
			products: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					price: doc.price,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products' + doc._id
					}
				}
			})
		};
		res.status(200).json(response);
	}).catch(err => {
		res.status(500).json({ error: err });
	});
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product.save().then(result => {
		// console.log(result);
		res.status(200).json({
			message: "Created product successfully",
			createdProduct: {
				_id: result._id,
				name: result.name,
				price: result.price,
				request: {
					type: 'POST',
					url: 'http://localhost:3000/products' + result._id
				}
			}
		});
	}).catch(err => res.status(500).json({ error: err }));
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id).exec().then(doc => {
		// console.log(doc);
		if (doc) {
			res.status(200).json(doc);
		} else {
			res.status(404).json({
				message: "Not valid entry found for provided ID"
			});
		}
	}).catch(err => {
		// console.log(err);
		res.status(500).json({ error: err });
	});
});

router.patch('/:productId', (req, res, next) => {
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: req.params.productId }, { $set: updateOps }).exec().then(result => {
		res.status(200).json(result);
	}).catch(err => {
		res.status(500).json({ error: err });
	});
});

router.delete('/:productId', (req, res, next) => {
	Product.remove({ _id: req.params.productId }).exec().then(result => {
		console.log(result);
		res.status(200).json(result);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	});
});

module.exports = router