import { SettingsDAO } from '@/db/SQLite';

const settingsGeter = new SettingsDAO();

let colorTheme: string = 'light';
settingsGeter.getSettings().then(({ theme }) => (colorTheme = theme));

export default {
  primary: colorTheme === 'light' ? '#246BA0' : '#FEFBEA',
  secondary: colorTheme === 'light' ? '#E8F3FF' : '#FEFBEA',
  background: colorTheme === 'light' ? '#FFFFFF' : '#01161E',
  tertiary: colorTheme === 'light' ? '#000000' : '#FEFBEA',
  darkTheme: {
    primary: '#FEFBEA',
    secondary: '#FEFBEA',
    background: '#01161E',
    tertriary: '#FEFBEA',
  },
};
