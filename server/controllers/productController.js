const fs = require('fs');
const path = require('path');
const numeral = require('numeral');

exports.pageProducts = async (req, res) => {
    const jsonFilePath = path.join(__dirname, '../..', process.env.PRODUCT_ROUTE);

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let products = JSON.parse(data).products;

        if (req.body.searchTerm) {
            const minPrice = parseFloat(req.body.searchTerm);
            if (!isNaN(minPrice)) {
                products = products.filter(product => product.product_price >= minPrice);
            }
        }

        const locals = {
            title: 'ProductJs',
            description: 'Free Product User Management System',
            products: products,
            numeral: numeral
        };

        res.render('product/product', locals);
    });
};

