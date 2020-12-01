const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const UserDB = require("./controllers/createUser");
const ClientDB = require("./controllers/clients");

const Session = require("./middlewares/session");

// Rota de autenticação
router.post("/auth", Auth.autenticar);

// Usuários
router.post("/usuarios", UserDB.createUser);

// Rotas para os clientes
router.post("/clientes", Session.verify, ClientDB.createClient);
router.put("/clientes/:id", Session.verify, ClientDB.updateClient);

module.exports = router;
