const repository = require('../repository/repository');

async function getPerson(skip, limit) {
    return repository.get(skip, limit)
}

async function createPerson(person) {
    return repository.create(person)
}

async function getPersonById(personId) {
    return repository.getById(personId)
}

async function getPersonByName(name) {
    var finalResponse = {};
    const details = await repository.getByName(name);
    const res = await getFriends(details.people[0].id);
    finalResponse.name = details.people[0].name;
    finalResponse.state = details.people[0].state;
    finalResponse.friends = [];
    for (let i = 0; i < res.friends.length; i++) {
        finalResponse.friends[i] = res.friends[i];
    }
    return finalResponse;
}

async function deletePersonById(personId) {
    return repository.deleteById(personId)
}

async function updatePerson(personId, person) {
    return repository.updatePerson(personId, person)
}

async function getFriends(personId) {
    return repository.getFriends(personId)
}

async function createRelation(personName, friendName, year) {
    return repository.createRelation(personName, friendName, year)
}

async function deleteRelationById(relationId) {
    return repository.deleteById(relationId)
}

const service = function () {

    return {
        getPerson: getPerson,
        createPerson: createPerson,
        getPersonById: getPersonById,
        getPersonByName: getPersonByName,
        deletePersonById: deletePersonById,
        updatePerson: updatePerson,
        getFriends: getFriends,
        createRelation: createRelation,
        deleteRelationById: deleteRelationById
    }
}

module.exports = service();