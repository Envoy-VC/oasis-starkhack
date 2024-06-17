import { createDojoConfig } from '@dojoengine/core';
import manifest from 'public/manifest.json';

export const dojoConfig = createDojoConfig({
  manifest,
});
