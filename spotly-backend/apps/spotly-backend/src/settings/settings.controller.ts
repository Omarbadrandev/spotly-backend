import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  Version,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateSettingsDto,
  SettingsDto,
  UpdateSettingsDto,
} from './settings/settings.dto';
import { SettingsApiService } from './settings/settings.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsApiService: SettingsApiService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create settings for a user',
    description: 'Creates new settings for the specified user',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'User ID',
    required: true,
  })
  @ApiBody({
    type: CreateSettingsDto,
    description: 'Settings creation data',
  })
  @ApiCreatedResponse({
    description: 'Settings successfully created',
    type: SettingsDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async createSettings(
    @Body() createSettingsDto: CreateSettingsDto,
    @Query('userId') userId: string
  ) {
    return this.settingsApiService.createSettings(createSettingsDto, userId);
  }

  @Get('user/:userId')
  @Version('1')
  @ApiOperation({
    summary: 'Get settings by user ID',
    description: 'Retrieves settings for the specified user',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'User ID',
  })
  @ApiOkResponse({
    description: 'Settings successfully retrieved',
    type: SettingsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Settings not found for the user',
  })
  async getSettingsByUserId(@Param('userId') userId: string) {
    return this.settingsApiService.getSettingsByUserId(userId);
  }

  @Patch()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update settings for a user',
    description: 'Updates the settings for the specified user',
  })
  @ApiBody({
    type: UpdateSettingsDto,
  })
  @ApiOkResponse({
    description: 'Settings successfully updated',
    type: SettingsDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async updateSettings(
    @Body() updateSettingsDto: UpdateSettingsDto,
    @Query('id') id: string
  ) {
    return this.settingsApiService.updateSettings(updateSettingsDto, id);
  }
}
