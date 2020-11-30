const db = require("../utils/database");

const obterEmailAutenticacao = async (email) => {
  const result = await db.query({
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email],
  });

  return result.rows[0];
};

const createUser = async (nome, email, senha) => {
  const result = await db.query({
    text: `INSERT INTO users (nome, email, senha)
            VALUES ( $1, $2, $3 )
            RETURNING *`,
    values: [nome, email, senha],
  });

  return result.rows;
};

module.exports = {
  createUser,
  obterEmailAutenticacao,
};
