import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages';
import GamePage from './pages/game';
import NFTPage from './pages/nft';
import NFTs from './pages/nfts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/nfts',
    element: <NFTs />,
  },
  {
    path: '/nft',
    element: <NFTPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
