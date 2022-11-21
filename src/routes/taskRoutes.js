const { Router } = require('express')
const TaskController = require('../controller/TaskController')
const CoreUtils = require('../CoreUtils')
const router = Router()

router.get('/all', CoreUtils.isAuthorized, TaskController.getAllTasks)

router.post('/create', CoreUtils.isAuthorized, TaskController.createTask)

router.get('/:id', CoreUtils.isAuthorized, TaskController.getTask)

router.put('/edit/:id', CoreUtils.isAuthorized, TaskController.updateTask)

router.delete('/delete/:id', CoreUtils.isAuthorized, TaskController.deleteTask)

module.exports = router