import manifest from '../../packages/contracts/manifests/dev/manifest.json';
import { createDojoConfig } from '@dojoengine/core';

export const dojoConfig = createDojoConfig({
  manifest,
});
