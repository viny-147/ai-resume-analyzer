import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ResumeHelper } from './resume.helper';
import { generateHtml } from '../scripts/generateHTML';
import * as fs from 'fs';

const pdfParse = require('pdf-parse');

@Injectable()
export class ResumeService {
    private genAi: GoogleGenAI;

    constructor(private readonly resumeHelper: ResumeHelper){
        this.genAi = new GoogleGenAI({});
    }
    async analyze(file: Express.Multer.File){
       try{
         const pdfData = await pdfParse(file.buffer);
        const resumeText = pdfData.text;

        const prompt = `
            You are a professional career advisor.
            
            Return ONLY valid JSON.
            Do NOT include markdown.
            Do NOT include explanation text.
            
            Return in this exact structure:
            
            {
              "detected_skills": {
                    "soft_skills": [],
                    "technical_skills": [],
                    "languages": [],
                    "domain_knowledge": []
                },
                "missing_skills": {
                    "technical_and_software": [],
                    "professional_and_project_management": [],
                    "certifications_and_qualifications": []
                },
                "career_suggestions": [],
                "improvement_tips": []
            }

        Resume:${resumeText}`;

        const res = await this.genAi.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const rawText = res.text || 'Try after sometime!!';

        // Remove markdown ```json ``` if present
        const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Convert string to actual JSON object
        const parsedResult = JSON.parse(cleanedText);

        return parsedResult;
       } catch(e){
        console.error("ERROR: ", e);
        throw e;
       }
    }

    async calculateAts(file: Express.Multer.File, jobDescription: string){
       try{
        const pdfData = await pdfParse(file.buffer);
        const resumtContent = pdfData.text;

        const prompt =`
            You are an ATS system.
            
            Compare the resume and the job description.
            
            return ONLY valid json in this formate:
            {
                "ats_score": number (0 to 100),
                "matched_keywords": [],
                "missing_keywords": [],
                "formatting_feedback": "",
                "experience_feedback": "",
                "improvement_suggestions": []
            }
            Resume:
            ${resumtContent}

            Job Description:
            ${jobDescription}       
        `;
        const res = await this.genAi.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        const rawText = res.text || 'Try after sometime!!';

        // Remove markdown ```json ``` if present
        const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Convert string to actual JSON object
        const parsedResult = JSON.parse(cleanedText);

        return parsedResult;
       } catch(e){
        console.error("ERROR: ", e);
        throw e;
       }
    }

    async rewriteService(file: Express.Multer.File, rewriteType: string){
        try{
            const pdfData = await pdfParse(file.buffer);
            const resumtContent = pdfData.text;
            const prompt = `
            Your are a professional resume writter.
            
            Rewrite the following resume in a ${rewriteType} formate/style.
            Improve clarity, grammer, spelling, structure, and impact.
            make it ATS friendly.
            
            Resume:${resumtContent}
            
            return the result into valid json as in the below formate:
            {
                "name":"",
                "phoneno":"",
                "email":"",
                "location":""
                "profiles":[{
                    "platform":"",
                    "url":""
                }],
                "summary":"",
                "skills":"",
                "experience":[{}],
                "education":[{}]
            }`;

            const res = await this.genAi.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            const cleanedText = res.text
                ?.replace(/```[\w]*\n?/g, '')
                ?.trim() || 'Try after Sometime!';

            const parsed = JSON.parse(cleanedText);
            const resumeHelper = await this.resumeHelper.convertResultToJSON(parsed);

            await this.resumeHelper.saveResumeFile(resumeHelper);
            await generateHtml('elegant');
            const html = fs.readFileSync('resume.html', 'utf-8');
            return {
                structured: JSON.stringify(resumeHelper),
                preview: html
            }
        }
        catch(e){
            console.error("ERROR: ", e);
            throw e;
        }
    }
}
