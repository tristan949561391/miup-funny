//---import
const Router = require('koa-router');
//---
const route = new Router().prefix('/');
//---route_list
route.get('/', async (ctx) => {
    ctx.body = 'asdas'

});
//export
module.exports = route;

