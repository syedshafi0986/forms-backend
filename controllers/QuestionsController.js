import Form from "../models/Form.js";
import Question from "../models/Question.js";
import mongoose from "mongoose";

// create question
const createQuestion= async(req , res)=>{
    try{
        const {formId}= req.params;
        const {type,text,options=[],required}= req.body;

            if (!type || !text) return res.status(400).json({ message: 'type and text are required' });
        const form = await Form.findById(formId)
    if (!form) return res.status(404).json({ message: 'Form not found' });
        if (form.creatorId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        

        if((type=='checkbox'|| type=='multiple_choice')&& (!Array.isArray(options)||options.length===0))
        {
                  return res.status(400).json({ message: 'options are required for choice questions' });

        }
    }
}
