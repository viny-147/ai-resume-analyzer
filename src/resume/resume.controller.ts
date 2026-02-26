import { Body, Controller, Get, Post, Query, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import type { Response } from 'express';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { generateHtml } from '../scripts/generateHTML';

@Controller('resume')
export class ResumeController {
    constructor(
        private readonly resumeService: ResumeService
    ){}

    @Get()
    @Render('index')
    uploadPage() {}

    @Post('analyze')
    @UseInterceptors(FileInterceptor('file'))
    @Render('result')
    async analyseResume(@UploadedFile() file: Express.Multer.File){
        const result = await this.resumeService.analyze(file);

        return {result};
    }

    @Post('atsScore')
    @UseInterceptors(FileInterceptor('file'))
    @Render('atsresult')
    async atsCalculator(@UploadedFile()  file: Express.Multer.File, 
    @Body('jobDescription') jobDescription: string,){

        const result = await this.resumeService.calculateAts(file, jobDescription);
        return {result};
    }

    @Post('resumeRewrite')
    @UseInterceptors(FileInterceptor('file'))
    @Render('rewriteResult')
    async rewriteResume(
        @UploadedFile() file: Express.Multer.File,
        @Body('rewriteType') rewriteType: string,
    ){
        const result = await this.resumeService.rewriteService(file, rewriteType);
        return result;
    }

    @Get('preview')
    async preview(@Res() res: Response) {
        const html = await generateHtml('elegant');
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
    }
}
