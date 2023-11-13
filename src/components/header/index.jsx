import cn from 'classnames';
import { Button } from '../button';
import { ReactComponent as CloseIcon } from '../search/assets/ic-close-input.svg';

import s from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/current-user-context';

export function Header({ children }) {
	const { user, error, onUpdateUser } = useContext(UserContext)
	const [errorOpen, setErrorOpen] = useState(true);


	const handleClickButtonEdit = () => {
		onUpdateUser({ name: 'Вася', about: 'Ментор' });
	};

	useEffect(() => {
		setErrorOpen(!errorOpen);
	}, [error]);

	return (
		<header className={s.header}>
			<div className={cn('container', s.wrapper)}>
				{children}
				<span>
					{user ? `${user?.name} : ${user?.about}` : 'Привет, гость!'}
				</span>
				<span>{user?.email}</span>
				<Button action={handleClickButtonEdit} type='header'>
					{user ? 'Изменить' : 'Войти'}
				</Button>
			</div>
			{errorOpen && (
				<div className={cn('error', s.error, { [s.hidden]: !errorOpen })}>
					<p>Авторизуйтесь</p>
					<form className={s.formAuth} action='submit'>
						<div>
							<label htmlFor='name'>Имя</label>
							<label htmlFor='password'>Пароль</label>

						</div>
						<div>
						<input id='name' type='name' placeholder='Введите Имя' />
							<input
								id='password'
								type='password'
								placeholder='Введите пароль'
							/>
						</div>
					</form>
					<CloseIcon onClick={() => setErrorOpen(!errorOpen)} />
				</div>
			)}
		</header>
	);
}
