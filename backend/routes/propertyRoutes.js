import express from 'express';
import Property from '../models/property.js';
import { adminOnly, authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

//get all properties
router.get('/', async (req,res)=>{
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
})

//get property by id
router.get('/:id', async(req,res)=>{
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.json(property);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
})

//Post for adding new property
router.post('/add-property',authMiddleware,adminOnly, async(req,res)=>{
    try {
        const {title, price, location, image, description} = req.body;
        if(!title || !price || !location || !description){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const newProperty = new Property({title, price, location, image, description});
        await newProperty.save();
        res.status(201).json({message: "Property added successfully", newProperty});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
})
export default router;