import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rate')  // エンドポイントのベースパス
export class RateController {
  constructor(private readonly rateService: RateService) {}

  // 新しいレートを保存するためのエンドポイント
//   @Post()
//   async saveRate(@Body() saveRateDto: { currencyPair: string, exchangeRate: number }) {
//     return this.rateService.saveRate(saveRateDto.currencyPair, saveRateDto.exchangeRate);
//   }
  @Post()
  async saveRate(@Body() saveRateDto: { id:string, name: string, currencyPair: string, exchangeRate: number | null,timestamp:string }) {
    // オブジェクト全体を渡すように変更
    return this.rateService.saveRate(saveRateDto);
  }

  // 前回訪問時のレートを取得するためのエンドポイント
  @Get(':name/details/:currencyPair')  // 順序を逆にする
  async getLastRate(@Param('name') name: string, @Param('currencyPair') currencyPair: string) {
    return this.rateService.getLastRate(currencyPair, name);
  }
//   async getLastRate(@Query('currencyPair') currencyPair: string, @Query('name') name: string) {
//     return this.rateService.getLastRate(currencyPair, name);
//   }
}
