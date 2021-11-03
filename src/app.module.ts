import { Module } from '@nestjs/common';
import { CancerTypesModule } from './cancer-types/cancer-types.module';

@Module({
    imports: [CancerTypesModule],
})
export class AppModule {}