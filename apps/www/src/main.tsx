import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router.tsx';
import './styles/global.css';
import 'unfonts.css';
import { setup } from './lib/dojo/generated/setup.ts';
import { DojoProvider } from './lib/dojo/DojoContext.tsx';
import { dojoConfig } from '../dojoConfig.ts';
import { Loading } from './Loading.tsx';
import { Web3Provider } from './providers/index.ts';

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
