export interface Company {
	id: string
	name: string
	address: string
	employees: Employee[]
}
export interface Employee {
	id: string
	firstName: string
	secondName: string
	position: string
	companyId: string
}
