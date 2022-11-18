import { Company, Employee } from '../interfaces'

const firstNames = ['Илья', 'Александр', 'Николай', 'Артем', 'Захар', 'Андрей', 'Григорий', 'Максим', 'Владимир']
const secondNames = ['Иванов', 'Медведев', 'Петров', 'Заборов', 'Доренко', 'Давыдов', 'Шмыгаль', 'Карпец']
const positions = ['Директор', 'Менедежер', 'Строитель', 'Программист', 'Прораб']
const companyNames1 = ['Альфа', 'Омега', 'Строй', 'Капитал', 'Платинум', '']
const companyNames2 = ['Инвест', 'Бетон', 'Окна', 'Заз', 'Билдинг']
const addresses = ['Садовая', 'Ленина', 'Красноармейская', 'Портовая']

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const getCompany = (): Omit<Company, 'id' | 'employees'> => {
	return {
		name: getRandomItem(companyNames1) + getRandomItem(companyNames2) + Math.floor(Math.random() * 1000),
		address: `ул. ${getRandomItem(addresses)}, д. ${Math.floor(Math.random() * 200)} `,
	}
}

const getEmployee = (): Employee => {
	return {
		id: Math.random().toString(36),
		firstName: getRandomItem(firstNames),
		secondName: getRandomItem(secondNames),
		position: getRandomItem(positions),
		companyId: '',
	}
}

export const generateCompany = (count: number) =>
	Array(count)
		.fill(0)
		.map(() => getCompany())

export const generateEmployees = (count: number): Employee[] =>
	Array(count)
		.fill(0)
		.map(() => getEmployee())
