import { useContext, useEffect, useState } from 'react';
import Product from '../../components/product';
import { Sort } from '../../components/sort'
import { Spinner } from '../../components/spinner';
import api from '../../utils/api';
import { isLiked } from '../../utils/products';

import s from './styles.module.css';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../not-found';
import { CardListContext } from '../../contexts/card-list-context';


export const ProductPage = () => {
    const { productId } = useParams()

    const [product, setProduct] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { onProductLike: handleLike } = useContext(CardListContext)

    function handleProductLike(product) {
        handleLike(product)
            .then(updateCard => setProduct(updateCard))
    }

    useEffect(() => {
        setIsLoading(true);
        api.getInfoProduct(productId)
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setProduct(productData);
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                console.log(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    return (
        <>
            {isLoading
                ? <Spinner />
                : !error && <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
            }

            {!isLoading && error && <NotFoundPage title='Товар не найден'/>}
        </>
    )
}