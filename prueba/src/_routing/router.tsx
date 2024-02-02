import React from 'react'
import {useRoutes} from 'react-router-dom';
import Index from '../pages/index';

/**
 * Function to create a Router component.
 *
 * @return {ReactElement} The routes for the Router component.
 */
const Router = () => {
    const _allRoutes = useRoutes([
        {
          path: '/',
          element: <Index />
        },
      ]);

    return _allRoutes;
}

export default Router;