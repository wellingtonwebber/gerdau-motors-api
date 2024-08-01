import { prisma } from '../src/lib/prisma'

async function seed() {
    const areas = [
        "Laminação 1",
        "Laminação 2",
        "Trefila 1",
        "Trefila 2",
        "Aciaria",
        "Manutenção",
        "Pregos",
        "Ampliados",
        "Utilidades",
        "Logística"
    ]

    const sectors = [
        "Desbaste",
        "Trem médio",
        "Zincagem",
        "Forno",
        "Lingotamento",
        "Oficina",
        "Mazipack",
        "Estaleiro",
        "Compressores",
        "MEP"
    ]

    const locations = [
        "APQ01",
        "APQ02",
        "APQ03",
        "BQE01",
        "BQE02",
        "BQE03",
        "CQD01",
        "CQD02",
        "CQD03",
        "DPQ01"
    ]

    const status = [
        "Em linha",
        "Reparo externo",
        "Reparo interno",
        "Teste",
        "Aguardando Peças"
    ]

    function generateUniqueCode(): string {
        // Gera um número aleatório entre 10000000 e 99999999 (inclusive)
        const randomCode = Math.floor(10000000 + Math.random() * 90000000);
        return randomCode.toString();
    }

    function getRandomIndexFromArray<T>(array: T[]): number {
        const randomIndex = Math.floor(Math.random() * array.length)
        return randomIndex
    }

    await prisma.area.createMany({
        data: areas.map( area => {
            return {
                center: 1402,
                name: area
            }
        })
    })

    await prisma.sector.createMany({
        data: sectors.map( (sector, index) => {
            return {
                name: sector,
                areaId: index + 1  
            }
        })
    })

    await prisma.location.createMany({
        data: locations.map( (location, index) => {
            return {
                code: location,
                sectorId: index + 1  
            }
        })
    })

    await prisma.status.createMany({
        data: status.map( value => {
            return { status: value }
        })
    })

    // areas.forEach( async area => {
    //     await prisma.area.create({
    //         data:{
    //             center: 1402,
    //             name: area
    //         }
    //     })
    // })

    // sectors.forEach( async (sector, index) => {
    //     await prisma.sector.create({
    //         data: {
    //             name: sector,
    //             area: {
    //                 connect: {
    //                   id: index + 1
    //                 }
    //             },
    //         }
    //     })
    // })

    // locations.forEach( async (location, index) => {
    //     await prisma.location.create({
    //         data: {
    //             code: location,
    //             sector: {
    //                 connect: {
    //                   id: index + 1
    //                 }
    //             },
    //         }
    //     })
    // })

    // status.forEach( async value => {
    //     await prisma.status.create({
    //         data: {
    //             status: value,
    //         }
    //     })
    // })

    const array = Array.from({ length: 20 }, () => {     
        return {
            code: generateUniqueCode(),
            manufacturer: 'WEG',
            power: 30,
            voltage: 380,
            current: 48.7,
            rpm: 1720,
            frame: '180M',
            type: 'W22',
            model: 'a493',
            status: {
                connect: {
                id: getRandomIndexFromArray(status) + 1
                }
            },
            location: {
                connect: {
                id: getRandomIndexFromArray(locations) + 1
                }
            }
        }
    })

    array.forEach(async value => {
        await prisma.motor.create({
            data: value
        })
    })

    // await prisma.motor.createMany({
    //     data: array.map((item) => {
    //         return {
    //             code: generateUniqueCode(),
    //             manufacturer: 'WEG',
    //             power: 30,
    //             voltage: 380,
    //             current: 48.7,
    //             rpm: 1720,
    //             frame: '180M',
    //             type: 'W22',
    //             model: 'a493',
    //             status: {
    //                 connect: {
    //                   id: getRandomIndexFromArray(status) + 1
    //                 }
    //             },
    //             location: {
    //                 connect: {
    //                   id: getRandomIndexFromArray(locations) + 1
    //                 }
    //             }
    //         }
    //     })
    // })

    // const motores = new Array(20).map( async () => {
    //     await prisma.motor.create({
    //         data: {
    //             code: generateUniqueCode(),
    //             manufacturer: 'WEG',
    //             power: 30,
    //             voltage: 380,
    //             current: 48.7,
    //             rpm: 1720,
    //             frame: '180M',
    //             type: 'W22',
    //             model: 'a493',
    //             status: {
    //                 connect: {
    //                   id: getRandomIndexFromArray(status) + 1
    //                 }
    //             },
    //             location: {
    //                 connect: {
    //                   id: getRandomIndexFromArray(locations) + 1
    //                 }
    //             }
    //         }
    //     })
    // })
}

seed().then(() => {
    console.log('Database seeded!')
    prisma.$disconnect()
})