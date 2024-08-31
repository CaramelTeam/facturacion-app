import { configureStore } from '@reduxjs/toolkit'
import { customerApi } from './services/customerApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './services/productsApi'

export const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([customerApi.middleware, productApi.middleware])
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch