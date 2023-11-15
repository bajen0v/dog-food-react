import { useContext } from 'react';
import { Spinner } from '../../components/spinner';

import s from './styles.module.css';
import { CardList } from '../../components/card-list';
import { CardListContext } from '../../contexts/card-list-context';

export const FavoritesPage = () => {
	const {isLoading, favorites: cards} = useContext(CardListContext)
	return (
		<>
			{isLoading ? 
				<Spinner />
			 : cards.length ? 
				<>
					<CardList cards={cards}/>
				</>
			    : <h1> Товары в избранном отсутствуют! </h1>
			}
		</>
	);
};
