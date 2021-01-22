import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import UsersCrud from '../components/users/UsersCrud';

export default (props) => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route path='/users' component={UsersCrud} />
		<Redirect from='*' to='/' />
	</Switch>
);
