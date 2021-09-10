// eslint-disable-next-line
const fastify = require("fastify")({ logger: true });

fastify.addSchema({
  $id: 'PlayerData',
  type: 'object',
  required: ['attempts', 'round', 'stats'],
  properties: {
    attempts: { type: 'number' },
    round: { type: 'number' },
    stats: {
      type: 'object',
      required: ['damage', 'health'],
      properties: {
        damage: { type: 'number' },
        health: { type: 'number' },
      },
    },
  },
});

fastify.get('/', async (_, reply) =>
  reply.send({ statusCode: 200, data: fastify.getSchemas() })
);

const playerData = {};

fastify.get('/:player', async (request, reply) => {
  const player = request.params.player;
  if (!(player in playerData)) {
    return reply.code(404).send({
      statusCode: 404,
      error: 'Bad Request',
      message: 'No player found with requested id',
    });
  }
  return reply.send({ statusCode: 200, data: playerData[player] });
});

fastify.put(
  '/:player',
  { schema: { body: { $ref: 'PlayerData#' } } },
  async (request, reply) => {
    const player = request.params.player;
    playerData[player] = request.body;
    return reply.send({ statusCode: 200, data: playerData[player] });
  }
);

const start = async () => {
  try {
    fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
