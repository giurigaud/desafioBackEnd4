const response = require("../utils/response");
const usersDB = require("../repositories/users");
const { encrypt } = require("../utils/password");

const createUser = async (ctx) => {
  const { email, senha, nome } = ctx.request.body;

  if (!email || !senha || !nome) {
    return response(ctx, 400, { message: "Por favor, insira todos os dados!" });
  }
  /**
   * Verificar a existencia do usuario
   */
  const existentUser = await usersDB.obterEmailAutenticacao(email);

  if (existentUser) {
    return response(ctx, 400, {
      message: "Email já cadastrado, por favor, utilize outro!",
    });
  }
  const senhaEncriptada = await encrypt(senha);

  const createUserController = await usersDB.createUser(
    nome,
    email,
    senhaEncriptada
  );

  return response(ctx, 201, createUserController);
};

module.exports = { createUser };
