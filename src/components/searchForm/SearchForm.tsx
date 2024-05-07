import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { InputField } from '../InputFIled/InputField'
import { Select } from '../select/Select'
import { SelectItem } from '../selectItem/SelectItem'
import styles from './SearchForm.module.scss'
import { defaultSelect } from '@/utils/default-select'
import useOutsideClick from '@/hooks/useOutsideClick'

interface IForm {
	inputValue: string
	changeInput: (e: ChangeEvent<HTMLInputElement>) => void
	setCheckDescription: Dispatch<SetStateAction<boolean>>
}

export function SearchForm({
	inputValue,
	changeInput,
	setCheckDescription,
}: IForm) {
	const { ref, isActive, setIsActive } = useOutsideClick(false)

	const toggleSelect = () => {
		if (isActive) return
		setIsActive(!isActive)
	}
	return (
		<form className={styles['form']} ref={ref}>
			<InputField
				value={inputValue}
				onChange={changeInput}
				onFocus={toggleSelect}
				onClick={toggleSelect}
				pathIcon="./images/search.svg"
				type="text"
				aria-label="поиск"
			/>
			<Select isOpen={isActive}>
				{defaultSelect.map((option) => (
					<SelectItem
						onClick={
							option.text === 'Что такое ЛУЧ?'
								? () => {
										setCheckDescription((prev) => !prev)
									}
								: () => {}
						}
						pathIcon="./images/search.svg"
						option={option}
						key={option.text}
					/>
				))}
			</Select>
		</form>
	)
}
