import Main from '../template/Main';

export default (props) => (
	<Main icon='home' title='Home' subtitle='Projeto React'>
		<div className='display-4'>Bem Vindo!</div>
		<hr />
		<p className='mb-0 text-muted'>
			Projeto criado usando React <i class='fa fa-react'></i>
		</p>
	</Main>
);
