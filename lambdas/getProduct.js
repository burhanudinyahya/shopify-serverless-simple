const axios = require('axios');
const responses = require('./responses');

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.ID){
        return responses._400({message: 'missing the productId from the path'})
    }

    const productId = event.pathParameters.ID;

    const product = await axios({
        method: 'GET',
        url: `https://STORE_NAME.myshopify.com/admin/api/2022-01/products/${productId}.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': 'YOUR_TOKEN',
        },
    });

    if(product.response.status !== 200){
        return responses._400({message: 'product not found'})
    }

    return responses._200(product.data.product)
}