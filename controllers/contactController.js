const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get/api/contacts
// @access private

const getContacts = 
 asyncHandler(
 async (req, res ) => {
     const contact = await Contact.find({user_id: req.user.id});
     res.status(200).json(contact);
 });



 // @desc Create  contacts
// @route Post/api/contacts
// @access private

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
        phone,
        user_id: req.user.id
      })
      res.status(201).json( contact);
 }
 );



// @desc Get  contacts
// @route Get/api/contacts/:id
// @access private

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
         if (contact.user_id.toString() !== req.user.id) {
              req.status(401);
              throw  new Error("User Don't have permission to update other user contact"); 
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
        
          if (contact.user_id.toString() !== req.user.id) {
              req.status(401);
              throw  new Error("User Don't have permission to delete other user contact"); 
         }
          await  Contact.deleteOne({_id: req.params.id});
       
      res.status(200).json(contact);
 }
 );

 
 module.exports = {getContacts, createContacts, getContact, upadateContact, deleteContact };
