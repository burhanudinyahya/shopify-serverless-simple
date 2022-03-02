const axios = require('axios');
const responses = require('./responses');
require('dotenv').config();

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.ID){
        return responses._400({message: 'missing the productId from the path'})
    }

    const productId = event.pathParameters.ID;

    const product = await axios({
        method: 'GET',
        url: `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2022-01/products/${productId}.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
    });

    if(product.response.status !== 200){
        return responses._400({message: 'product not found'})
    }

    return responses._200(product.data.product)
}