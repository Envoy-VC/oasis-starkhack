import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages';
import GamePage from './pages/game';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/game',
		element: <GamePage />,
	},
]);

export const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
