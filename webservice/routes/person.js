const router = require('express').Router()
const validate = require('../middleware/validate')
const { check, validationResult } = require('express-validator');
const controller = require('../controllers/personController');

router.get('/details/id', controller.getPersonById)
router.get('/details', controller.getPersonByName)

router.get('/', controller.getPerson)
router.put(
    '/',
    [
        check('person.name').notEmpty(),
        check('person.state').notEmpty(),
    ],
    validate,
    controller.updatePerson)
router.post('/',
    [
        check('person.name').notEmpty(),
        check('person.state').notEmpty(),
    ],
    validate,
    controller.createPerson)
router.delete('/', controller.deletePerson)

router.get('/friends', controller.getFriends)
router.post('/relation',
[
    check('person.name').notEmpty(),
    check('person.friendName').notEmpty(),
    check('person.year').notEmpty(),
],
validate,
controller.createRelation)
router.delete('/relation', controller.deleteRelationById)


module.exports = router