import { Company, Employee } from '../interfaces'
import { handleRes } from '../lib'

const apiUrl = 'http://localhost:3001/'
const headers = {
	'Content-Type': 'application/json',
}

export const api = {
	getCompanies: async (page: number, limit = 20) => {
		const res = await fetch(apiUrl + `companies/?_page=${page}&_limit=${limit}`)
		const resData = await handleRes<Company[]>(res)
		for (const cp of resData.data) {
			const employees = await api.getEmployees(cp.id)
			cp.employees = employees.data
		}
		return resData
	},
	getEmployees: async (companyId: string) => {
		const res = await fetch(apiUrl + `employees?companyId=${companyId}`)
		const resData = await handleRes<Employee[]>(res)
		return resData
	},
	addCompany: async (data: { name: string; address: string }) => {
		const res = await fetch(`${apiUrl}companies`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				name: data.name,
				address: data.address,
			}),
		})
		const resData = await handleRes<Company>(res)
		return resData
	},
	addCompanyEmployee: async (data: {
		firstName: string
		secondName: string
		position: string
		companyId: string
	}) => {
		const res = await fetch(encodeURI(`${apiUrl}employees/`), {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		})
		const resData = await handleRes<Employee>(res)
		return resData
	},
	removeCompanies: async (companyIds: string[]) => {
		const requests = companyIds.map((id) =>
			fetch(apiUrl + `companies/${id}`, {
				method: 'DELETE',
				headers,
			}),
		)
		await Promise.all(requests)
	},
	removeEmployees: async (employeeIds: string[]) => {
		const requests = employeeIds.map((id) =>
			fetch(apiUrl + `employees/${id}`, {
				method: 'DELETE',
				headers,
			}),
		)
		await Promise.all(requests)
	},
	saveComapnyChangegs: async (companies: Company[]) => {
		const requests = companies.map(({ id, address, name }) =>
			fetch(apiUrl + `companies/${id}`, {
				method: 'PUT',
				headers,
				body: JSON.stringify({ address, name }),
			}),
		)
		const res = await Promise.all(requests)
		const updatedData = await Promise.all(res.map((r) => handleRes<Company>(r)))
		return updatedData
	},
	saveEmployeeChangegs: async (employees: Employee[]) => {
		const requests = employees.map((employee) =>
			fetch(apiUrl + `employees/${employee.id}`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(employee),
			}),
		)
		const res = await Promise.all(requests)
		const updatedData = await Promise.all(res.map((r) => handleRes<Employee>(r)))
		return updatedData
	},
}
