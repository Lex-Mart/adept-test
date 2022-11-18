import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '..'
import { Company, Employee } from '../../interfaces'
import { api } from '../../services'

interface companyState {
	hasNextPage: boolean
	companies: Company[]
	companyCheckedRows: string[]
	companyChangedRows: Record<string, Company>
	employeeCheckedRows: string[]
	employeeChangedRows: Record<string, Employee>
}

const initialState: companyState = {
	hasNextPage: true,
	companies: [],
	companyCheckedRows: [],
	companyChangedRows: {},
	employeeCheckedRows: [],
	employeeChangedRows: {},
}

const fetchCompanies = createAsyncThunk('company/fetch', async (page: number) => {
	const companies = await api.getCompanies(page)
	return companies
})

const addCompany = createAsyncThunk('company/add', async (companyData: { name: string; address: string }) => {
	const company = await api.addCompany(companyData)
	return company
})

const addEmployee = createAsyncThunk(
	'company/addEmployee',
	async (data: { firstName: string; secondName: string; position: string; companyId: string }) => {
		const company = await api.addCompanyEmployee(data)
		return company
	},
)

const deleteCompanies = createAsyncThunk('company/delete', async (_, { getState }) => {
	const state = getState() as AppState
	const ids = state.company.companyCheckedRows
	await api.removeCompanies(ids)
	return ids
})

const deleteEmployees = createAsyncThunk('company/deleteEmployee', async (companyId: string, { getState }) => {
	const state = getState() as AppState
	const ids = state.company.employeeCheckedRows
	await api.removeEmployees(ids)
	return { companyId, ids }
})

const updateCompanies = createAsyncThunk('company/update', async (_, { getState }) => {
	const state = getState() as AppState
	const updatedData = await api.saveComapnyChangegs(Object.values(state.company.companyChangedRows))
	return updatedData
})

const updateEmployees = createAsyncThunk('company/updateEmployees', async (_, { getState }) => {
	const state = getState() as AppState
	const updatedData = await api.saveEmployeeChangegs(Object.values(state.company.employeeChangedRows))
	return updatedData
})

const companySlice = createSlice({
	name: 'company',
	initialState: initialState,
	reducers: {
		setCompanyChecked: (state, { payload }: PayloadAction<string>) => {
			const alreadyChecked = state.companyCheckedRows.includes(payload)
			if (alreadyChecked) {
				state.companyCheckedRows = state.companyCheckedRows.filter((id) => id !== payload)
			} else {
				state.companyCheckedRows.push(payload)
			}
		},
		toggleAllCompanyChecked: (state) => {
			const isAllChecked = state.companies.length === state.companyCheckedRows.length
			if (isAllChecked) {
				state.companyCheckedRows = []
			} else {
				state.companyCheckedRows = state.companies.map((company) => company.id)
			}
		},
		setEmployeeChecked: (state, { payload }: PayloadAction<string>) => {
			const alreadyChecked = state.employeeCheckedRows.includes(payload)
			if (alreadyChecked) {
				state.employeeCheckedRows = state.employeeCheckedRows.filter((id) => id !== payload)
			} else {
				state.employeeCheckedRows.push(payload)
			}
		},
		toggleAllEmployeeChecked: (state) => {
			const company = state.companies.find(({ id }) => id === state.companyCheckedRows[0])

			if (company) {
				const isAllChecked = company.employees.length === state.employeeCheckedRows.length
				if (isAllChecked) {
					state.employeeCheckedRows = []
				} else {
					state.employeeCheckedRows = company?.employees.map(({ id }) => id)
				}
			}
		},
		addChangedCompany: (state, { payload }: PayloadAction<Company>) => {
			state.companyChangedRows[payload.id] = payload
		},
		removeUnchangedCompany: (state, { payload }: PayloadAction<Company>) => {
			delete state.companyChangedRows[payload.id]
		},
		cancelAllCompanyChanges: (state) => {
			state.companyChangedRows = {}
		},
		addChangedEmployee: (state, { payload }: PayloadAction<Employee>) => {
			state.employeeChangedRows[payload.id] = payload
		},
		removeUnchangedEmployee: (state, { payload }: PayloadAction<Employee>) => {
			delete state.employeeChangedRows[payload.id]
		},
		cancelAllEmployeeChanges: (state) => {
			state.employeeChangedRows = {}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCompanies.fulfilled, (state, { payload }) => {
				state.companies.push(...payload.data)
				if (state.companies.length >= payload.totalCount) {
					state.hasNextPage = false
				}
			})
			.addCase(fetchCompanies.rejected, (state) => {
				state.hasNextPage = false
			})
			.addCase(addCompany.fulfilled, (state, { payload }) => {
				if (!state.hasNextPage) {
					payload.data.employees = []
					state.companies.push(payload.data)
				}
			})
			.addCase(addEmployee.fulfilled, (state, { payload }) => {
				state.companies.find(({ id }) => id === payload.data.companyId)?.employees.push(payload.data)
			})
			.addCase(deleteCompanies.fulfilled, (state, { payload }) => {
				state.companies = state.companies.filter(({ id }) => !payload.includes(id))
				state.companyCheckedRows = []
				payload.forEach((id) => {
					const isChanged = state.companyChangedRows[id]
					if (isChanged) {
						delete state.companyChangedRows[id]
					}
				})
			})
			.addCase(deleteEmployees.fulfilled, (state, { payload }) => {
				const company = state.companies.find(({ id }) => id === payload.companyId)
				if (company) {
					company.employees = company.employees.filter(({ id }) => !payload.ids.includes(id))
					state.employeeCheckedRows = []
				}
			})
			.addCase(updateCompanies.fulfilled, (state, { payload }) => {
				payload.forEach(({ data }) => {
					const companyIdx = state.companies.findIndex(({ id }) => id === data.id)
					if (companyIdx >= 0) {
						state.companies[companyIdx] = { ...state.companies[companyIdx], ...data }
					}
				})
				state.companyChangedRows = {}
			})
			.addCase(updateEmployees.fulfilled, (state, { payload }) => {
				payload.forEach(({ data }) => {
					const companyIdx = state.companies.findIndex(({ id }) => id === data.companyId)
					if (companyIdx >= 0) {
						const employeeIdx = state.companies[companyIdx].employees.findIndex(({ id }) => id === data.id)
						if (employeeIdx >= 0) {
							state.companies[companyIdx].employees[employeeIdx] = data
						}
					}
				})
				state.employeeChangedRows = {}
			})
	},
})

export const companyActions = {
	...companySlice.actions,
	fetchCompanies,
	addCompany,
	addEmployee,
	deleteCompanies,
	deleteEmployees,
	updateCompanies,
	updateEmployees,
}

export default companySlice.reducer
