import { createDojoConfig } from '@dojoengine/core';

import manifest from './src/assets/manifest.json';

export const dojoConfig = createDojoConfig({
  manifest,
});
