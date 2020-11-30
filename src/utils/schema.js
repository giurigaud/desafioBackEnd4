const db = require("./database");

const schema = {
  1: `CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		nome TEXT NOT NULL,
		email TEXT NOT NULL,
		senha TEXT NOT NULL
	);`,

  2: `CREATE TABLE IF NOT EXISTS clients (
		id SERIAL PRIMARY KEY,
		user_id TEXT NOT NULL,
		nome TEXT NOT NULL,
		email TEXT NOT NULL,
		cpf TEXT NOT NULL,
		tel TEXT NOT NULL	
	);`,

  3: `CREATE TABLE IF NOT EXISTS invoices (
		id SERIAL PRIMARY KEY,
		id_do_cliente TEXT NOT NULL,
		descricao TEXT NOT NULL,
		valor INT NOT NULL,
		vencimento DATE NOT NULL,
        link_do_boleto TEXT NOT NULL,
        codigo_de_barras TEXT NOT NULL,
		data_de_pagamento TEXT NOT NULL
	);`,

  4: `INSERT INTO users (nome, email, senha) 
		VALUES ('giu', 'Giuliana Rigaud', '$2a$10$/szrgAhrYuVbrpGD7JWu1OBrLQ4hlDurTShBLWv2P4Fn2eNY7xOHC')`,
  5: `INSERT INTO users (nome, email, senha) 
		VALUES ('gui', 'Guilherme Bernal', '$2a$10$1cNB1TnDq/HracxWXbBz1uB64h9MXJDibR70yig5k9CfFB8BwcOaK')`,
};

const up = async (number = null) => {
  if (number) {
    await db.query({ text: schema[number] });
  } else {
    for (const value in schema) {
      await db.query({ text: schema[value] });
    }
  }
};

const drop = async (table = null) => {
  if (table) {
    return db.query({ text: `DROP TABLE ${table}` });
  }
};
console.log("conectado no dbeaver");

up();

// drop();
