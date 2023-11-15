import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import api from '../../utils/api';
import { Header } from '../header';
import { Search } from '../search';
import { Logo } from '../logo';
import { Footer } from '../footer';
import { Sort } from '../sort';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { NotFoundPage } from '../../pages/not-found';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';

import { UserContext } from '../../contexts/current-user-context';
import { CardListContext } from '../../contexts/card-list-context';

import s from './styles.module.css'
import { FavoritesPage } from '../../pages/favorite-page';

const colorTheme = {
	white: 'white',
	black: 'black'
}

export function App() {
	const [cards, setCards] = useState([]);
	const [favorites, setFavorites] = useState([])
	const [currentUser, setCurrentUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [theme, setTheme] = useState(false);


	const debounceSearchQuery = useDebounce(searchQuery, 300);

	function handleFormSubmit(dataInput) {
		setSearchQuery(dataInput);
	}

	function handleUpdateUser(dataUserUpdate) {
		api
			.setUserInfo(dataUserUpdate)
			.then(updateUserFromServer => {
				setCurrentUser(updateUserFromServer);
			})
			.catch(err => {
				setError(err);
				console.log(err);
			});
	}

	function handleProductLike(product) {
		const like = isLiked(product.likes, currentUser._id);

		return api.changeLikeProductStatus(product._id, like)
			.then(updateCard => {
				const newProducts = cards.map(cardState => {
				return cardState._id === updateCard._id ? updateCard : cardState;
				});
				setCards(newProducts);

				if(!like) {
					setFavorites(prevState => [...prevState, updateCard])
				} else {
					setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
				}
				return updateCard;
			});
	}

	function handleTheme() {
		setTheme(!theme)
	}

	useEffect(() => {
		api.search(debounceSearchQuery).then(dataSearch => {
			setCards(dataSearch);
		});
	}, [debounceSearchQuery]);

	useEffect(() => {
		setIsLoading(true);
		api
			.getAllInfo()
			.then(([productsData, userInfoData]) => {
				setCurrentUser(userInfoData);
				setCards(productsData.products);

				const favorites = productsData.products.filter(product => isLiked(product.likes, userInfoData._id))
				setFavorites(favorites)
			})
			.catch(err => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
		}, []);
		
		return (
			<>
			{/* <ThemeContext.Provider value={ThemeContext}> */}
			<CardListContext.Provider
				value={{
					cards,
					favorites,
					onProductLike: handleProductLike,
					isLoading: isLoading
				}}
			>
				<UserContext.Provider
					value={{ user: currentUser, error, onUpdateUser: handleUpdateUser }}
				>
					<Header handleTheme={handleTheme} theme={theme}>
						<Logo className={theme ? colorTheme.white : colorTheme.black}/>
						<Routes>
							<Route
								path='/'
								element={<Search handleFormSubmit={handleFormSubmit} />}
							/>
						</Routes>
					</Header>
					<main className='content container'>
						<Routes>
							<Route path='/' element={<CatalogPage />} />
							<Route path='/favorites' element={<FavoritesPage />} />
							<Route path='/faq' element={<FaqPage />} />
							<Route path='/product/:productId' element={<ProductPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</main>

					<Footer />
				</UserContext.Provider>
			</CardListContext.Provider>
			{/* </ThemeContext.Provider> */}
		</>
	);
}
