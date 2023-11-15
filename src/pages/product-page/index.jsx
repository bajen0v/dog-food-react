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
import { useApi } from '../../hooks';


export const ProductPage = () => {
    const { productId } = useParams()

    const handleGetProduct = () => api.getProductById(productId)
    const {data:product , error, loading:isLoading, setData} = useApi(handleGetProduct, productId)
    const { onProductLike: handleLike } = useContext(CardListContext)

    function handleProductLike(product) {
        handleLike(product)
            .then(updateCard => setData(updateCard))
    }

    return (
        <>
            {isLoading
                ? <Spinner />
                : !error && <Product {...product} onProductLike={handleProductLike} />
            }

            {!isLoading && error && <NotFoundPage title='Товар не найден'/>}
        </>
    )
}