const fp = require('fastify-plugin')
 
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-dynamodb'), {
        endpoint: 'https://dynamodb.ap-northeast-2.amazonaws.com',
        region: "ap-northeast-2"
    })
})