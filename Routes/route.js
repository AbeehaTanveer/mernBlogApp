const { Router } = require('express');
const router = Router();
const {signup}=require('../Controller/controller.js')
const {login}=require('../Controller/controller.js')
const {CreatePost}=require('../Controller/controller.js')
const {getallsinglefiles} =require('../Controller/controller.js')
const {singleFileUpload}=require('../Controller/controller.js')
const {GetPost}=require('../Controller/controller.js')
const {Show}=require("../Controller/controller.js")
const {DelUser}=require("../Controller/controller.js")


// const {POSTS}=require("../Controller/controller.js")

const {upload}=require('../helper/multer.js')




router.post('/Signup',signup) 
router.post('/Login', login)
router.post('/create', CreatePost)
router.get('/create', GetPost)
router.get('/posts/:id',Show );
router.delete('/:id', DelUser);


router.post('/singleFile',upload.single('file'),singleFileUpload);
router.get('/getFile', upload.single('file'),getallsinglefiles);




module.exports = router;
