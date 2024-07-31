import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

describe('Motors routes', () => {
    beforeAll( async () => {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })

    beforeEach( () => {
        execSync('npx prisma migrate reset --force')        
        execSync('npx prisma migrate deploy')
    })

    it('should be able to create a new area', async () => {

        const areaId = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })
        .expect(201)

        console.log(areaId.body.areaId)
        
    })

    it('should be able to create a new sector', async () => {

        const { body } = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })

        const areaId = body.areaId

        const sectorId = await request(app.server)
        .post('/sectors')
        .send({
            name: 'Desbaste',
            areaId: areaId
        })
        .expect(201)

        console.log(sectorId.body.sectorId)
        
    })

    it('should be able to create a new location', async () => {

        const { body } = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })

        const areaId = body.areaId

        const sectorResponse = await request(app.server)
        .post('/sectors')
        .send({
            name: 'Desbaste',
            areaId: areaId
        })

        const locationResponse = await request(app.server)
        .post('/locations')
        .send({
            code: 'LA1-TDES-PPLA1',
            sectorId: sectorResponse.body.sectorId
        })
        .expect(201)
        
    })

    it('should be able to create a new motor status', async () => {

        const statusResponse = await request(app.server)
        .post('/status')
        .send({
            status: 'Reparo Externo',
        })
        .expect(201)
        
    })

    it('should be able to create a new motor', async () => {

        const { body } = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })

        const areaId = body.areaId

        const sectorResponse = await request(app.server)
        .post('/sectors')
        .send({
            name: 'Desbaste',
            areaId: areaId
        })

        const locationResponse = await request(app.server)
        .post('/locations')
        .send({
            code: 'LA1-TDES-PPLA1',
            sectorId: sectorResponse.body.sectorId
        })

        const statusResponse = await request(app.server)
        .post('/status')
        .send({
            status: 'Reparo Externo',
        })

        const motorResponse = await request(app.server)
        .post('/motors')
        .send({
            code: '10332434',
            manufacturer: 'WEG',
            power: 30,
            voltage: 380,
            current: 48.7,
            rpm: 1720,
            frame: '180M',
            type: 'W22',
            model: 'a493',
            statusId: statusResponse.body.statusId,
            locationId: locationResponse.body.locationId
        })
        .expect(201)
        
    })

    it('should not be able to create a new motor with the same code', async () => {

        const { body } = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })

        const areaId = body.areaId

        const sectorResponse = await request(app.server)
        .post('/sectors')
        .send({
            name: 'Desbaste',
            areaId: areaId
        })

        const locationResponse = await request(app.server)
        .post('/locations')
        .send({
            code: 'LA1-TDES-PPLA1',
            sectorId: sectorResponse.body.sectorId
        })

        const statusResponse = await request(app.server)
        .post('/status')
        .send({
            status: 'Reparo Externo',
        })

        await request(app.server)
        .post('/motors')
        .send({
            code: '10332434',
            manufacturer: 'WEG',
            power: 30,
            voltage: 380,
            current: 48.7,
            rpm: 1720,
            frame: '180M',
            type: 'W22',
            model: 'a493',
            statusId: statusResponse.body.statusId,
            locationId: locationResponse.body.locationId
        })

        const motorResponse = await request(app.server)
        .post('/motors')
        .send({
            code: '10332434',
            manufacturer: 'WEG',
            power: 30,
            voltage: 380,
            current: 48.7,
            rpm: 1720,
            frame: '180M',
            type: 'W22',
            model: 'a493',
            statusId: statusResponse.body.statusId,
            locationId: locationResponse.body.locationId
        })
        .expect(500)
        
    })

    it('should be able to get a motor by id', async () => {

        const { body } = await request(app.server)
        .post('/areas')
        .send({
            center: 1402,
            name: 'Laminação 1'
        })

        const areaId = body.areaId

        const sectorResponse = await request(app.server)
        .post('/sectors')
        .send({
            name: 'Desbaste',
            areaId: areaId
        })

        const locationResponse = await request(app.server)
        .post('/locations')
        .send({
            code: 'LA1-TDES-PPLA1',
            sectorId: sectorResponse.body.sectorId
        })

        const statusResponse = await request(app.server)
        .post('/status')
        .send({
            status: 'Reparo Externo',
        })

        const motorResponse = await request(app.server)
        .post('/motors')
        .send({
            code: '10332434',
            manufacturer: 'WEG',
            power: 30,
            voltage: 380,
            current: 48.7,
            rpm: 1720,
            frame: '180M',
            type: 'W22',
            model: 'a493',
            statusId: statusResponse.body.statusId,
            locationId: locationResponse.body.locationId
        })

        const motor = await request(app.server).get(`/motor/${motorResponse.body.motorId}`)

        expect(motor.body.motor.id).toEqual(motorResponse.body.motorId)
    })

    
})