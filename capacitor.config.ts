/// <reference types="@capacitor/local-notifications" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'dist',
  server: {
    cleartext: true
  },
  plugins: {
    CapacitorCookies: {
      enabled: true
    },
    CapacitorHttp: {
      enabled: true
    }
  },
  LocalNotifications: {
    smallIcon: "ic_stat_icon_config_sample",
    iconColor: "#488AFF",
    sound: "beep.wav"
  }
};

export default config;
