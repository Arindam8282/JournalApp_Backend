const { Router } = require('express')
const ContactController = require('../controller/ContactController')
const CoreUtils = require('../CoreUtils')
const router = Router()

router.get('/all', CoreUtils.isAuthorized, ContactController.getAllContacts)

router.get('/search', CoreUtils.isAuthorized, ContactController.searchContacts)

router.post('/create', CoreUtils.isAuthorized, ContactController.createContact)

router.get('/:id', CoreUtils.isAuthorized, ContactController.getContact)

router.put('/edit/:id', CoreUtils.isAuthorized, ContactController.updateContact)

router.delete('/delete/:id', CoreUtils.isAuthorized, ContactController.deleteContact)

module.exports = router