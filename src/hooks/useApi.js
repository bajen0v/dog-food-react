import { useEffect, useState } from 'react'


export const useApi = (handler, dependince) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        setLoading(true)
        handler()
            .then(result => setData(result))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    },[dependince])

    return {data, error, loading, setData};
}