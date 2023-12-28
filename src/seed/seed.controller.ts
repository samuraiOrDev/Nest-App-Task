import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SeedService } from './seed.service';

interface TypeResponseSeed {
  msg: string;
  seed: string;
}
@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) { }
  @Get()
  async seed(): Promise<TypeResponseSeed> {
    try {
      await this.seedService.seed();

      return {
        msg: 'ok',
        seed: 'Los datos de prueba se han insertado correctamente',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
