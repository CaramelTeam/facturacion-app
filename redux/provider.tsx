import React from 'react'
import { Provider as ReactReduxProvider } from 'react-redux'
import { store } from './store';

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactReduxProvider
            store={store}
        >
            {children}
        </ReactReduxProvider>
    )
}
