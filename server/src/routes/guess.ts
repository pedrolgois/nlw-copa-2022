import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { authenticate } from "../plugins/authenticate"
import { z } from "zod"

export const guessRoutes = async (fastify: FastifyInstance) =>{
  fastify.get('/guesses/count', async () => {
    const guesses = await prisma.guess.count()
    return { count: guesses }
  })

  fastify.post('/pools/:poolId/games/:gameId/guesses', {onRequest: [authenticate]}, async (request,reply) =>{
    const createGuessParams = z.object({
      poolId: z.string(),
      gameId: z.string(),
    })

    const createGuessBody = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints: z.number()
    })

    const { poolId, gameId } = createGuessParams.parse(request.params);
    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body);

    const participant = await prisma.participant.findUnique({
      where: {
        userId_poolId:{
          poolId,
          userId: request.user.sub
        }
      }
    })

    if(!participant){
      return reply.status(400).send({
        message: "Your're not allowed to guess inside this pool."
      })
    }

    const guess = await prisma.guess.findUnique({
      where:{
        participantId_gameId:{
          participantId: participant.id,
          gameId
        }
      }
    })

    if(guess){
      return reply.status(400).send({
        message: "Your already sent a guess to this game"
      })
    }

    const game = await prisma.game.findUnique({
      where:{
        id: gameId,
      }
    })

    if(!game){
      return reply.status(400).send({
        message: "Game not found"
      })
    }

    if(game.date < new Date()){
      return reply.status(400).send({
        message: "This game already happened"
      })
    }

    const x = await prisma.guess.create({
      data:{
        gameId,
        participantId: participant.id,
        firstTeamPoints,
        secondTeamPoints,
      }
    })

    return reply.status(201).send(x)

  })
}