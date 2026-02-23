import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ResumeModule,
    ConfigModule.forRoot({
      isGlobal: true, // important
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
