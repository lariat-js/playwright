import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
}

export default config
