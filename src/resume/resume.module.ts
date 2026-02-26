import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { ResumeHelper } from './resume.helper';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, ResumeHelper]
})
export class ResumeModule {}
