
const neo4j = require('../neo4j')
const Person = require('../entities/Person');
const Friends = require('../entities/Friends');

async function getById(id) {

    const get_by_id_cypher = `MATCH (p:Person {id: $id})
                                RETURN p`

    return neo4j.read(get_by_id_cypher, { id })
        .then(res => {
            const peopleCount = res.records.length;
            const people = res.records.map(row => {
                return new Person(
                    row.get('p'),
                )
            })
            return {
                total: peopleCount,
                count: peopleCount,
                people: people.map(p => p.toJson()),
            }
        })
}

async function getByName(name) {

    const get_by_name_cypher = `MATCH (p:Person {name: $name})
                                RETURN p`

    return neo4j.read(get_by_name_cypher, { name })
        .then(res => {
            const peopleCount = res.records.length;
            const people = res.records.map(row => {
                return new Person(
                    row.get('p'),
                )
            })
            return {
                total: peopleCount,
                count: peopleCount,
                people: people.map(p => p.toJson()),
            }
        })
}


async function get(skip, limit) {

    const params = {
        skip, limit
    }

    const where = [];

    const get_all_skip_limit_cypher = `MATCH (p:Person)
                                        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                                        WITH count(p) AS peopleCount, collect(p) AS people
                                        UNWIND people AS p
                                        WITH peopleCount, p
                                        ORDER BY p.id
                                        SKIP $skip LIMIT $limit
                                        RETURN peopleCount, p`

    return neo4j.read(get_all_skip_limit_cypher, params)
        .then(res => {
            const peopleCount = res.records.length ? res.records[0].get('peopleCount') : 0
            const people = res.records.map(row => {
                return new Person(
                    row.get('p'),
                )
            })
            return {
                total: peopleCount,
                count: limit,
                people: people.map(p => p.toJson()),
            }
        })

}

async function create(person) {

    const create_person_cypher = `CREATE (p:Person {id: randomUUID(),name: $name, state: $state})
                                    RETURN p`

    return neo4j.write(create_person_cypher, person)
        .then(res => {
            const person = new Person(res.records[0].get('p'))
            return {
                ...person.toJson()
            }
        })
}

async function deleteById(id) {

    const delete_by_id_cypher = `MATCH (p:Person {id: $id})
                                    DETACH DELETE p`

    return neo4j.write(delete_by_id_cypher, { id })
        .then(res => {
            console.log(res)
        })
}

async function updatePerson(id, person) {

    const update_person_cypher = `MATCH (p:Person {id: $id})
                                   SET p += $person
                                   RETURN p`

    return neo4j.write(update_person_cypher, { id, person })
        .then(res => {
            const person = new Person(res.records[0].get('p'))
            return {
                ...person.toJson()
            }
        })
}

async function getFriends(id) {

    const person_friends_cypher = `Match(p:Person)-[relation:FRIENDS_SINCE]->(f:Person)
                                    Where p.id = $id
                                    Return f, relation`

    return neo4j.read(person_friends_cypher, { id })
        .then(res => {
            const relationsCount = res.records.length ? res.records.length : 0
            const relation = res.records.map(row => {
                return new Friends(
                    row.get('f'),
                    row.get('relation'),
                )
            })
            return {
                total: relationsCount,
                friends: relation.map(f => f.toJson()),
            }
        })
}

async function createRelation(personName, friendName, year) {

    const create_relation_cypher = `MATCH (a:Person{name:toString($personName)}),
                                          (b:Person{name:toString($friendName)})
                                    CREATE (a)-[:FRIENDS_SINCE{year:toInteger($year)}]->(b)`

    return neo4j.write(create_relation_cypher, { personName, friendName, year })
        .then(res => {
            return {
                status: "ok"
            }
        })
}

async function deleteRelationById(personName) {

    const delete_relation_cypher = `MATCH (a:Person{name:toString($personName)})-[r:FRIENDS_SINCE]->()
                                    DELETE r`

    return neo4j.write(delete_relation_cypher, { personName })
        .then(res => {
            console.log(res)
        })
}

const repository = function () {
    return {
        get: get,
        create: create,
        getById: getById,
        deleteById: deleteById,
        updatePerson: updatePerson,
        getFriends: getFriends,
        getByName: getByName,
        createRelation: createRelation,
        deleteRelationById: deleteRelationById
    }
}

module.exports = repository();