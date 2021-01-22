import './Nav.css';
import { Link } from 'react-router-dom';

export default (props) => (
	<aside className='menu-area'>
		<nav className='menu'>
			<Link to='/'>
				<i className='fa fa-home'></i> Home
			</Link>
			<Link to='/users' className=''>
				<i className='fa fa-users'></i> Cadastro
			</Link>
		</nav>
	</aside>
);
