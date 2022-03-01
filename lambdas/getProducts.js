const axios = require('axios');
const responses = require('./responses');

exports.handler = async event => {
    const produts = await axios({
        method: 'GET',
        url: `https://STORE_NAME.myshopify.com/admin/api/2022-01/products.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': 'YOUR_TOKEN',
        },
    });

    if(!produts.status === 200){
        return responses._400({message: 'products not found'})
    }

    return responses._200(produts.data.products)
}