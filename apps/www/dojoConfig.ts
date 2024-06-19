import { createDojoConfig } from '@dojoengine/core';

import manifest from '../../packages/contracts/manifests/dev/manifest.json';

export const dojoConfig = createDojoConfig({
  manifest,
});
