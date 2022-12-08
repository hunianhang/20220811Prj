const service = require('../services/personService');
const { int } = require('neo4j-driver');
const e = require('express-domain-middleware');

async function getPerson(req, res, next) {

    const skip = int(parseInt(req.query.offset) || 0)
    const limit = int(parseInt(req.query.limit) || 10)

    service.getPerson(skip, limit)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function createPerson(req, res, next) {

    const person = req.body.person

    service.createPerson(person)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function getPersonById(req, res, next) {

    const personId = req.query.id

    service.getPersonById(personId)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function getPersonByName(req, res, next) {

    const name = req.query.name

    service.getPersonByName(name)
        .then(json => {
            console.log("response sent!")
            res.send(json)
        })
        .catch(e => next(e))
}

async function deletePerson(req, res, next) {

    const personId = req.query.id

    service.deletePersonById(personId)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function updatePerson(req, res, next) {

    const personId = req.query.id
    const person = req.body.person

    service.updatePerson(personId, person)
        .then(json => res.send(json))
        .catch(e => next(e))

}

async function getFriends(req, res, next) {
    const personId = req.query.id
    service.getFriends(personId)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function createRelation(req, res, next) {

    const person = req.body.person.name
    const friendName = req.body.person.friendName
    const year = req.body.person.year

    if(!person) throw e(res.send("Provide person information"));
    if(!friendName) throw e(res.send("Provide friendName information"));

    service.createRelation(person, friendName, year)
        .then(json => res.send(json))
        .catch(e => next(e))
}

async function deleteRelationById(req, res, next) {

    const relationId = req.query.id

    service.deleteRelationById(relationId)
        .then(json => res.send(json))
        .catch(e => next(e))
}

const controller = function () {

    return {
        getPerson: getPerson,
        createPerson: createPerson,
        deletePerson: deletePerson,
        getPersonById: getPersonById,
        getPersonByName: getPersonByName,
        updatePerson: updatePerson,
        getFriends, getFriends,
        createRelation: createRelation,
        deleteRelationById: deleteRelationById
    }
}

module.exports = controller();