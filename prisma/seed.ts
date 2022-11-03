import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://camo.githubusercontent.com/76271d201da8a9d39b942a3d6d75d985095e5ebf52e33b49b22019c8768b39b3/68747470733a2f2f692e696d6775722e636f6d2f43456f71526d382e706e67'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL1',
            ownerId: user.id,

            participants: {
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.201Z',
            firstTeamCountryCode:  'BR',
            secondTeamCountryCode: 'AR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.201Z',
            firstTeamCountryCode:  'DE',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints:   2,
                    secondTeamPoints:  1,

                    participant: {
                        connect: {
                            userId_poolId: {
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