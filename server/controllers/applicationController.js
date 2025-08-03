
const Applicant = require('../models/Applicant');

const registerApplicants=async(req,res)=>{
    const {name,email,phone,message}= req.body()

     if(!name || !email || !phone || !message){
        return res.status(400).json({message:"All fields are required"})
     }

     try {
        const newApplicant =  Applicant.create({
            name,
            email,
            phone,
            message
        })

        //email sending
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_PASS
            }
        });
            await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Application Received",
            text: `Hi ${name},\n\nThanks for registering. We’ll contact you soon.\n\n– Team`
            });
            return res.status(200).json({message:"Application submitted successfully"})
     } catch {
          res.status(500).json({ msg: err.message });
     }
}

const getApplicant =async(req,res)=>{
    try {
        const applicants = await  Applicant.find().sort({createdAt:-1});
        res.status(200).json(applicants);
    }catch {
                     res.status(500).json({ msg: err.message });
 
    }
}

module.exports ={
    registerApplicants,
    getApplicant
}