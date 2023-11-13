import { useContext } from 'react';
import { Sort } from '../../components/sort';
import { Spinner } from '../../components/spinner';

import s from './styles.module.css';
import { CardList } from '../../components/card-list';
import { CardListContext } from '../../contexts/card-list-context';

export const CatalogPage = () => {
	const {isLoading, cards} = useContext(CardListContext)
	return (
		<>
			{isLoading ? 
				<Spinner />
			 : cards.length ? 
				<>
					<Sort />
					<CardList />
				</>
			    : <h1> Ошибка загрузки!</h1>
			}
		</>
	);
};
