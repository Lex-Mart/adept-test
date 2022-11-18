import { configureStore } from '@reduxjs/toolkit'
import companyReducer from './companySlice/companySlice'

const store = configureStore({
	reducer: {
		company: companyReducer,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
