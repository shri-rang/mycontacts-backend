
const express = require("express");
const router = express.Router();
const {getContacts, createContacts, getContact, upadateContact, deleteContact} = require('../controllers/contactController');
const validateToken = require("../middleware/validateTokenHandeler");


router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put( upadateContact).delete( deleteContact);








 module.exports = router