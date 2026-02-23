import { Body, Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService){}

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
}
