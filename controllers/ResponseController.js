import Response from "../models/Response.js";
import User from "../models/userModel.js";
import Form from "../models/Form.js";
import mongoose from "mongoose";

const submitResponse = async(req , res)=>{
     try {
    const { formId } = req.params;
    const { answers, responderId } = req.body; 
     if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'answers are required' });
    }

    // check for form existance 
    
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    if (!form.isActive) return res.status(400).json({ message: 'Form is closed' });
        const questionIds = form.questions.map(q => q._id.toString());
        for(const a in answers){
             if (!a.questionId || a.answer === undefined) {
        return res.status(400).json({ message: 'Each answer must have questionId and answer' });
      }
       if (!questionIds.includes(String(a.questionId))) {
        return res.status(400).json({ message: `questionId ${a.questionId} is invalid` });
      }
        }

     }
}



