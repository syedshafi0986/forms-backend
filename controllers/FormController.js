import User from "../models/userModel.js";
import Form from "../models/Form.js";
import mongoose from "mongoose";
 
const createForms =async (req,res)=>{
    try{
     const { title, description, isActive } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const form = new Form({
        title,
        description,
        creatorId:req.User.id,
        isActive:isActive?? true
    })

    await form.save();
        res.status(201).json(form);

    }catch(e){
    res.status(500).json({ message: e.message });
    }


}

// get form details (public)
const getForm = async(req,res)=>{
    try{
    const {id} = req.params;
    const formDetails = await Form.findById({id})
        if (!formDetails) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json(formDetails);

    }catch(e){
            res.status(500).json({ message: e.message });

    }

}


// get all forms for the user 
const getUserForm = async(req,res)=>{

    try{
        const userId = req.params.userId ?? req.user.id;
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
        const userForms = await Form.find({creatorId:userId}).sort({createdAt:-1})
        res.status(201).json(userForms)
    }catch(e){
            res.status(500).json({ message: e.message });

    }
}

// updating the form 
const updateForm = async(req,res)=>{
    try{
        const {id} = req.params
        const updates = (({title, description, isActive})=>({title, description, isActive}))(req.body);
        const form = await Form.findById(id);
        if(form.creatorId.toString() !== req.user.id ) return res.status(403).json({ message: 'Forbidden' });
        Object.keys(form).forEach(k=>{
            if(updates[k]!==undefined) form[k]=updates[k]
        })
        await form.save();
        res.status(200).json(form)
    }
    catch(e){
            res.status(500).json({ message: e.message });

    }
}

// delete form
const deleteForm = async(req,res)=>{
    try{
        const {id} =req.params;
        const deletedForm = await Form.findByIdAndDelete(id);
        res.status(200).json(deleteForm)
    }catch(e){
            res.status(500).json({ message: e.message });

    }
}

export {
    createForms,
    updateForm,
    deleteForm,
    getForm,
    getUserForm
}