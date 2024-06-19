import React from 'react';
import ReactDOM from 'react-dom/client';

import 'unfonts.css';

import { dojoConfig } from '../dojoConfig.ts';
import { Loading } from './Loading.tsx';
import { DojoProvider } from './lib/dojo/DojoContext.tsx';
import { setup } from './lib/dojo/generated/setup.ts';
import { Web3Provider } from './providers/index.ts';
import App from './router.tsx';
import './styles/global.css';

async function init() {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('React root not found');
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  const setupResult = await setup(dojoConfig);

  !setupResult && <Loading />;

  root.render(
    <React.StrictMode>
      <DojoProvider value={setupResult}>
        <Web3Provider>
          <App />
        </Web3Provider>
      </DojoProvider>
    </React.StrictMode>
  );
}

init();
