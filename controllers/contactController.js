const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get/api/contacts
// @access public

const getContacts = 
 asyncHandler(
 async (req, res ) => {
     const contact = await Contact.find();
     res.status(200).json(contact);
 });



 // @desc Create  contacts
// @route Post/api/contacts
// @access public

const createContacts = 
 asyncHandler(
    async (req, res ) => {
      console.log("this is recievd body :", req.body);
      const {name, email, phone} = req.body;
      if (!name || !email || !phone ) {
         res.status(400);
         throw new Error("All field are mandatory");
      }

      const contact = await Contact.create({
        name,
        email,
        phone
      })
      res.status(201).json( contact);
 }
 );



// @desc Get  contacts
// @route Get/api/contacts/:id
// @access public

const getContact = 
 asyncHandler(
    async (req, res ) => {
        const contact =  await Contact.findById(req.params.id);
         if (!contact) {
             res.status(404);
             throw new Error("Contact Not Found");
         }
      res.status(200).json( contact );
 });



 
// @desc Get  contacts
// @route Put/api/contacts/:id
// @access public

const upadateContact = 
 asyncHandler(
    async (req, res ) => {
          const contact =  await Contact.findById(req.params.id);
         if (!contact) {
             res.status(404);
             throw new Error("Contact Not Found");
         }
        
          const upadtedContact =  await Contact.findByIdAndUpdate(
              req.params.id,
              req.body,
              {new: true}
           );

      res.status(200).json(upadtedContact);
 }
 );



// @desc Delete contact
// @route Delete/api/contacts/:id
// @access public

const deleteContact =
 asyncHandler(
 async (req, res ) => {
         const contact =  await Contact.findById(req.params.id);
         console.log("Ths s ", contact);
         if (!contact) {
             res.status(404);
             throw new Error("Contact Not Found");
         }
        
          await  Contact.deleteMany();
       
      res.status(200).json(contact);
 }
 );

 
 module.exports = {getContacts, createContacts, getContact, upadateContact, deleteContact };
