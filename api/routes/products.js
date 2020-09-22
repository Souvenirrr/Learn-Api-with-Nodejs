const express = require('express');
const router = express.Router();

// get products
router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Success gets'
	});
});

router.post('/', (req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	}
	res.status(200).json({
		message: 'Success post',
		createdProduct: product
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	if (id == '12') {
		res.status(200).json({
			message: 'You discovered the special ID',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You can pass'
		})
	}
});

router.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated product!'
	});
});

router.delete('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'Deleted product!'
	});
});

module.exports = router