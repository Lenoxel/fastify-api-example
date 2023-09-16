import { products } from "./in-memory-data.mjs";

export const createRoutes = (fastify) => {
  fastify.get("/products", (_, reply) => {
    reply.code(200).send(products);
  });

  fastify.get("/products/:productId", (request, reply) => {
    const {
      params: { productId },
    } = request;

    const productById = products.find(({ id }) => Number(productId) === id);

    if (!productById) {
      reply.code(404).send({ message: "Produto não encontrado" });
      return;
    }

    reply.code(200).send(productById);
  });

  fastify.post("/products/", (request, reply) => {
    const { body } = request;

    if (!body) {
      reply.code(400).send({ message: "Requisição inválida" });
      return;
    }

    const newProduct = { ...body, id: products.length + 1 };

    products.push(newProduct);

    reply.code(201).send({ message: "Produto criado com sucesso!" });
  });

  fastify.patch("/products/:productId", (request, reply) => {
    const {
      body,
      params: { productId },
    } = request;

    if (!body) {
      reply.code(400).send({ message: "Requisição inválida" });
      return;
    }

    const productByIdIndex = products.findIndex(
      ({ id }) => Number(productId) === id
    );

    if (productByIdIndex === -1) {
      reply.code(404).send({ message: "Produto não encontrado" });
      return;
    }

    let productById = products[productByIdIndex];

    productById = { ...productById, ...body };

    products.splice(productByIdIndex, 1, productById);

    reply.code(200).send({ message: "Produto atualizado com sucesso!" });
  });
};
