import App from './render';
import Base from './pages/base';
import Component from './pages/component/generic';

let Routes = [];

Routes.push({ 
	path: '/fetch', 
	component: Base,
	indexRoute: { component: Component },
    catchAll: { component: Component },
    childRoutes: [
		{ path: 'test', component: Component }
    ]
})

Routes.push({ path: '*', component: Component })

const home = Component;

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: home },
    catchAll: { component: home },
    childRoutes: Routes
  }
]

export default routeConfig
