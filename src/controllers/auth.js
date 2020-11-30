const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const Password = require("../utils/password");
const users = require("../repositories/users");

const autenticar = async (ctx) => {
  const { email = null, senha = null } = ctx.request.body;

  if (!email || !senha) {
    return response(ctx, 400, { mensagem: "Pedido mal formatado" });
  }

  const usuario = await users.obterEmailAutenticacao(email);

  if (usuario) {
    const comparison = await Password.check(senha, usuario.senha);
    if (comparison) {
      const token = await jwt.sign(
        { email: usuario.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return response(ctx, 200, { token });
    }
  }
  return response(ctx, 404, { mensagem: "Email ou senha incorretos" });
};

module.exports = { autenticar };
