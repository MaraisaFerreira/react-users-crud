import { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const headerProps = {
	icon: 'users',
	title: 'Usuários',
	subtitle: 'Cadastro de usuários: Crud (Create, Read, Update and Delete)',
};

const baseURL = 'http://localhost:3001/users';
const initialState = {
	user: { name: '', city: '' },
	list: [],
};

export default class UserCrud extends Component {
	state = { ...initialState };

	componentWillMount() {
		axios(baseURL).then((resp) => {
			this.setState({ list: resp.data });
		});
	}

	clear() {
		this.setState({ user: initialState.user });
	}

	save() {
		const user = this.state.user;
		const method = user.id ? 'put' : 'post';
		const url = user.id ? `${baseURL}/${user.id}` : baseURL;
		axios[method](url, user).then((resp) => {
			const list = this.getUpdatedList(resp.data);
			this.setState({
				user: initialState.user,
				list,
			});
		});
	}

	getUpdatedList(user, add = true) {
		const list = this.state.list.filter((u) => u.id !== user.id);
		if (add) list.unshift(user);
		return list;
	}

	updateField(event) {
		const user = { ...this.state.user };
		user[event.target.name] = event.target.value;
		this.setState({ user });
	}

	renderForm() {
		return (
			<div className='form'>
				<div className='row'>
					<div className='col-12 col md-6'>
						<div className='form-group'>
							<label>Nome:</label>
							<input
								type='text'
								className='form-control'
								name='name'
								value={this.state.user.name}
								onChange={(e) => this.updateField(e)}
								placeholder='Digite o nome'
							/>
						</div>
					</div>

					<div className='col-12 col md-6'>
						<div className='form-group'>
							<label>Cidade:</label>
							<input
								type='text'
								className='form-control'
								name='city'
								value={this.state.user.city}
								onChange={(e) => this.updateField(e)}
								placeholder='Digite a cidade'
							/>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-12 d-flex justify-content-end'>
						<button className='btn btn-success' onClick={(e) => this.save(e)}>
							Salvar
						</button>

						<button
							className='btn btn-secondary ml-2'
							onClick={(e) => this.clear(e)}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		);
	}

	load(user) {
		this.setState({ user });
	}

	remove(user) {
		axios.delete(`${baseURL}/${user.id}`).then((resp) => {
			const list = this.getUpdatedList(user, false);
			this.setState({ list });
		});
	}

	renderTable() {
		return (
			<table className='table mt-4'>
				<thead>
					<th>Id</th> <th>Nome</th>
					<th>Cidade</th>
					<th>Editar/Remover</th>
				</thead>
				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}

	renderRows() {
		return this.state.list.map((user) => {
			return (
				<tr key={user.id}>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.city}</td>
					<td>
						<button
							className='btn btn-outline-primary'
							onClick={() => this.load(user)}
						>
							<i className='fa fa-pencil'></i>
						</button>
						<button
							className='btn btn-outline-danger ml-2'
							onClick={() => this.remove(user)}
						>
							<i className='fa fa-trash'></i>
						</button>
					</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<Main {...headerProps}>
				{this.renderForm()}
				<hr className='mt-4' />
				<h2 className='text-muted mt-3'>Cadastrados</h2>
				{this.renderTable()}
			</Main>
		);
	}
}
