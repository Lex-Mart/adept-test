import { FC } from 'react'

import './Table.scss'

export const Table: FC = ({ children }) => {
	return <div className="table">{children}</div>
}
