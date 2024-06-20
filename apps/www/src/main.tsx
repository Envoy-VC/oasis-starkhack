import React from 'react';
import { createRoot } from 'react-dom/client';

import 'unfonts.css';

import { dojoConfig } from '../dojoConfig.ts';
import { Toaster } from './components/ui/sonner.tsx';
import { DojoProvider } from './lib/dojo/dojo-context.tsx';
import { setup } from './lib/dojo/generated/setup.ts';
import { Web3Provider } from './providers/index.ts';
import { App } from './router.tsx';
import './styles/global.css';

async function init() {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('React root not found');
  const root = createRoot(rootElement);
  const setupResult = await setup(dojoConfig);

  root.render(
    <React.StrictMode>
      <Web3Provider>
        <DojoProvider value={setupResult}>
          <App />
          <Toaster />
        </DojoProvider>
      </Web3Provider>
    </React.StrictMode>
  );
}

void init();
