import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService]  // make it available for other modules to import and use it.  This is not necessary if it's only used in this module.  If it's used in other modules, you'll need to import it.  Here, it's used in MyLoggerModule.ts.  It's not necessary in AppModule.ts.  The AppModule.ts is the main entry point for your application and doesn't need to import or use the My
})
export class MyLoggerModule {}
