const axios = require('axios');
const responses = require('./responses');
require('dotenv').config();

exports.handler = async event => {
    const produts = await axios({
        method: 'GET',
        url: `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2022-01/products.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
    });

    if(!produts.status === 200){
        return responses._400({message: 'products not found'})
    }

    return responses._200(produts.data.products)
}