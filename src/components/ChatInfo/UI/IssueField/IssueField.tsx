import React, { FC, SetStateAction } from 'react'
import cl from './IssueField.module.scss'

interface IProps {
	issue: string
	setIssue: React.Dispatch<SetStateAction<string>>
}

const IssueField: FC<IProps> = ({ issue, setIssue }) => {
	return (
		<textarea
			className={cl.input}
			value={issue}
			onChange={event => setIssue(event.target.value)}
		/>
	)
}

export default IssueField
