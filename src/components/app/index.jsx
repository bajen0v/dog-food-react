import { useState, useEffect } from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Sort } from '../sort';
import { Logo } from '../logo';
import { Search } from '../search';
import { UserContext } from '../../contexts/current-user-context';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found';
import { CardListContext } from '../../contexts/card-list-context';
import { ThemeContext } from '../../contexts/theme-context';

export function App() {
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

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
				return updateCard;
			});
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
			})
			.catch(err => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
		}, []);
		
		return (
			<>
			<ThemeContext.Provider>
			<CardListContext.Provider
				value={{
					cards,
					onProductLike: handleProductLike,
					isLoading: isLoading
				}}
			>
				<UserContext.Provider
					value={{ user: currentUser, error, onUpdateUser: handleUpdateUser }}
				>
					<Header>
						<Logo />
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
							<Route path='/faq' element={<FaqPage />} />
							<Route path="/product/:productId" element={<ProductPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</main>

					<Footer />
				</UserContext.Provider>
			</CardListContext.Provider>
			</ThemeContext.Provider>
		</>
	);
}
