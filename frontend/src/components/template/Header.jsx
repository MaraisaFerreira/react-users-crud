import './Header.css';

export default (props) => (
	<header className='header d-none d-sm-flex flex-column'>
		<h1 className='mt-2'>
			<i className={`fa fa-${props.icon} text-primary`}></i> {props.title}
		</h1>
		<p className='text-muted lead pr-3'>
			<i class='fa fa-angle-double-right'></i> {props.subtitle}
		</p>
	</header>
);
