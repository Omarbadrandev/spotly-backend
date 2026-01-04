import { ParkingSpotsModule } from '../parking-spots/parking-spots.module';
import { SettingsModule } from '../settings/settings.module';
import { UsersModule } from '../users/users.module';
import { AppModule } from './app.module';

export const routes = [
  {
    path: '/',
    module: AppModule,
  },
  {
    path: '/users',
    module: UsersModule,
  },
  {
    path: '/parking-spots',
    module: ParkingSpotsModule,
  },
  {
    path: '/settings',
    module: SettingsModule,
  },
];
