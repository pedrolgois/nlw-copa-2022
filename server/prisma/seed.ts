import { PrismaClient } from "@prisma/client"
//
const prisma = new PrismaClient()
const main =  async () =>{
  const user = await prisma.user.create({ 
    data:{
      name: 'Pedro Gois',
      email: 'pedrogois@gmail.com',
      avatarUrl: 'https://github.com/pedrolgois.png',
    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: 'Bolão 01',
      code: 'BOL0001',
      ownerId: user.id,
      Participants:{
        create:{
          userId: user.id
        }
      }

    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-02T12:00:00.165Z',
      firstTeamCC: 'DE',
      secondTeamCC: 'BR',
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-03T12:00:00.165Z',
      firstTeamCC: 'BR',
      secondTeamCC: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant:{
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

}

main()