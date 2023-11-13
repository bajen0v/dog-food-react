import cn from 'classnames';
import s from './styles.module.css';

import { ReactComponent as CloseIcon } from './assets/ic-close-input.svg';
import { ReactComponent as SearchIcon } from './assets/ic-search.svg';
import { useState } from 'react';

const optionBtn = {
	open: cn([s['search__btn']]),
	active_input: ` ${s['search__input-active']}`,
	close: cn([s['search__btn']], [s['search__btn-hidden']])
};

export function Search({ handleFormSubmit }) {
	const [inputActive, setInputActive] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

	function handleInputChange(e) {
		e.preventDefault();
		setSearchQuery(e.target.value);
		handleFormSubmit(searchQuery);
	}

	function handleBtnSubmit(e){
		e.preventDefault();
		setInputActive(!inputActive)
	}

	return (
		<form className={s.search} onSubmit={handleFormSubmit}>
			<input
				type='text'
				onBlur={() => setInputActive(!inputActive)}
				onClick={() => inputActive && setInputActive(!inputActive)}
				className={
					inputActive
						? cn([s['search__input-active']], [s['search__input']])
						: cn([s['search__input']])
				}
				onChange={e => {
					handleInputChange(e);
				}}
				placeholder='Поиск'
			/>
			<button
				// className={inputActive ? optionBtn.close : optionBtn.open}
				className={optionBtn.open}
				onClick={handleBtnSubmit}
			>
				{inputActive ? <SearchIcon /> : <CloseIcon />}

				
			</button>
		</form>
	);
}
