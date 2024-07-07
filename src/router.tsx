import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import React from 'react';
import Home from './Home';
import Character from './Character';
import ErrorPage from './components/ErrorPage';
import ErrorComponent from './components/ErrorComponent';


const router = createBrowserRouter([
	{
		path:"",
		element:<Root/>,
		children:[
			{
				path:"",
				element:<Home/>,
				errorElement:<ErrorComponent/>,
				children:[{
					path:"character/:characterId",
					element:<Character/>,
					errorElement:<ErrorComponent/>,
				}]
			}
		],
		
		errorElement:<ErrorPage/>
	}
]);

export default router;
