import { BASE_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';
import { CommonResponseI } from '../types/common-response';

interface ProductDetailsI {
    id: number;
    name: string;
    description: string;
    price: number;
    productKey: number;
    unitKey: string;
    unitName: string;
}

export const productApi = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: { Authorization: `Bearer ${getCookie('factuToken')}` }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<CommonResponseI<ProductDetailsI>, { page?: number, perPage?: number }>({
            query: ({ page = 1, perPage = 10 } = {}) => ({
                url: '/products',
                params: { page, perPage }
            })
        }),

    })
})

export const {
    useGetProductsQuery
} = productApi;