import { BASE_URL } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomerDataI } from '@/components/customers/CustomerTable';
import { getCookie } from 'cookies-next';

interface CustomerDetailsI {
    id: string;
    legal_name: string;
    tax_id: string;
    tax_system: string;
    zip: string;
    email: string;
    street?: string;
    exterior?: string;
    interior?: string;
    neighborhood?: string;
    city?: string;
    municipality?: string;
    state?: string;
    country?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export const customerApi = createApi({
    reducerPath: 'customerAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: { Authorization: `Bearer ${getCookie('factuToken')}` }
    }),
    endpoints: (builder) => ({
        getCustomers: builder.query<CustomerDataI, { page?: number, perPage?: number }>({
            query: ({ page = 1, perPage = 10 } = {}) => ({
                url: '/customer',
                params: { page, perPage }
            })
        }),
        addCustomer: builder.mutation({
            query: body => ({
                url: '/customer',
                method: 'POST',
                body: body

            })
        }),
        getCustomerByID: builder.query<CustomerDetailsI, {}>({
            query: (id: string) => ({
                url: `/customer/${id}`
            })
        }),
        deleteCustomer: builder.mutation({
            query: (id: string) => ({
                url: `/customer/${id}`,
                method: 'DELETE',
            })
        }),
    })

})


export const {
    useGetCustomersQuery,
    useAddCustomerMutation,
    useDeleteCustomerMutation,
    useGetCustomerByIDQuery
} = customerApi;