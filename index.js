const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./src/routes");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = new Koa();
server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, "0.0.0.0", null, () => console.log("Rodando.."));
