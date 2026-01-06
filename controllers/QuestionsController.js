import Form from "../models/Form.js";
import mongoose from "mongoose";

// create question
const createQuestion= async(req , res)=>{
    try{
        const {formId}= req.params;
        const {type,text,options=[],required}= req.body;
        console.log("the form id:",formId)

            if (!type || !text) return res.status(400).json({ message: 'type and text are required' });
        const form = await Form.findById(formId)
    if (!form) return res.status(404).json({ message: 'Form not found' });
        if (form.creatorId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        

        if((type=='checkbox'|| type=='multiple_choice')&& (!Array.isArray(options)||options.length===0))
        {
                  return res.status(400).json({ message: 'options are required for choice questions' });

        }
        const question = {type,text,options:options.map(o=>({text:o})),required:!!required}
        form.questions.push(question);
        await form.save();
        res.status(201).json(form.questions[form.questions.length - 1]);

    }
    catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

}

// Update question
const updateQuestion = async(req,res)=>{
    try{
                const {formId,id:questionId}= req.params;

        const {type,text,options,required}= req.body;
                const form = await Form.findById(formId)
                    if (!form) return res.status(404).json({ message: 'Form not found' });

    if (form.creatorId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const q = form.questions.id(questionId)
    if (!q) return res.status(404).json({ message: 'Question not found' });
        if(type) q.type=type
        if(text) q.text=text
    if (options) q.options = Array.isArray(options) ? options.map(o => ({ text: o })) : q.options;
    if (required !== undefined) q.required = !!required;
    await form.save();
    res.status(201).json(q)

    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// delete question
const DeleteQuestion = async(req,res)=>{
    try{
        const {formId,questionId} = req.params;
        const form = await Form.findById(formId);
        console.log("from delte fid:",formId)
        if (form.creatorId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        const q = form.questions.id(questionId)
        console.log("the questions is:"+q)
            if (!q) return res.status(404).json({ message: 'Question not found' });
form.questions.pull({ _id: questionId });
        await form.save()

 res.json({ message: 'Question removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

}

export {
    createQuestion,
    updateQuestion,
    DeleteQuestion
}