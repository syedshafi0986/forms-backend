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
        
        // filtering out the exact required questions 
        const reqr = form.questions.filter(r=>r.required).map(q=>q._id.toString())
        console.log(reqr)
       
        for(const r in reqr)
        {
          console.log(r)
          if(!answers.some(a=> a.questionId===r && a.answers!== undefined && a.a.answers!== null && a.answers!=='')){
                    return res.status(400).json({ message: 'All required questions must be answered' });

          }
        }
        const resp = new Response({
      formId,
      responderId: req.user?.id ?? responderId ?? null, // if user logged in use req.user.id
      answers
    });
    await resp.save();
    res.status(201).json({ message: 'Response submitted', id: resp._id });
      }
     }catch(e){
         console.error(err);
    res.status(500).json({ message: 'Server error' });
     }
}

// get the response 
const getResponse = async (req,res)=>{
  try{
    const {formId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(formId)) return res.status(400).json({ message: 'Invalid formId' });
    const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ message: 'Form not found' });
    if (form.creatorId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const responses = await Response.find({formId}).sort({submittedAt:-1})
    res.status(200).json(responses)
  }catch(e){
         console.error(err);
    res.status(500).json({ message: 'Server error' });
     }
}

export{
  submitResponse,
  getResponse
}