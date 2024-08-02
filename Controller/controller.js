const User = require("../Models/Model.js");
const bcrypt = require("bcrypt");
const createmodelSchema=require('../Models/createModel.js')
const Fileupload =require('../Models/uploadModel.js')

// const jwt =require('jsonwebtoken')
// const dotenv=require('dotenv');
// const token=require('../Models/token.js')
// dotenv.config();


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Failed to create user" });
  }
};

const login = async (req, res) => {
  const  { email,password} = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
     password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Failed to login. Please try again." });
  }
};




// Upload FILEE



const singleFileUpload = async (req, res, next) => {
    try {
        const file =  new Fileupload(

            {
                fileName:req.file.originalname,
                filePath:req.file.path,
                fileType:req.file.mimetype,
                // filesize:fileSizeFormatter(req.file.size,2)
            }
        );

        await file.save( )
        // This is shown In the Backend Console.log
        console.log(file);

        //  when The File Upload in dB(when make a models)then the file uploaded success msg shown in the Postman api
        // its also show in the Frontend console.log
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        res.status(400).send(error.msg);
    }
};

const getallsinglefiles=async(req,res,next)=>{
  try {
    const files= await Fileupload.find().sort({ createdAt: -1 }); 
    res.status(200).send(files)
  } catch (error) {
    res.status(400).send(error)
    
  }
}

const CreatePost = async (req, res) => {
  try {
    const { title,description ,username,categories,createdDate,picture} = req.body;
    console.log('Request Body:', req.body); // Log request body
    const userCreated = await createmodelSchema.create({ title ,description,username,categories,createdDate,picture});
    console.log('Created User:', userCreated); // Log created user
    res.status(200).json({ msg: "User Post successfully", user: userCreated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create user" });
  }
};

const GetPost=async(req,res)=>{
  try {
    // Fetch all posts from the database
    const posts = await createmodelSchema.find();

    // Send the posts as a JSON response
    res.status(200).json(posts);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }}

  

// Define a route to fetch data based on ID
const Show=async(req, res)=>{

  
    try {
      const post = await createmodelSchema.findById(req.params.id);
      res.json(post);
      // res.status(200).json({ msg: "Happy Hacking " });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  }
  


  const DelUser = async (req, res) => {
    try {
      const user = await createmodelSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ msg: "Failed to delete user" });
    }
  };

  module.exports = {signup,login , singleFileUpload, getallsinglefiles,CreatePost,GetPost,Show,DelUser}
