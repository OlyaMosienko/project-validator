import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	let isValueValid = value.length >= 3;

	function onInputButtonClick() {
		let promptValue = prompt().trim();

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setValue(promptValue);
		} else {
			setError('');
			setValue(promptValue);
		}
	}

	function onAddButtonClick() {
		if (isValueValid) {
			const updatedList = [
				...list,
				{ id: Date.now(), value: value, date: new Date().toLocaleString() },
			];
			setList(updatedList);
			setValue('');
			setError('');
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			<>{error !== '' ? <div className={styles.error}>{error}</div> : null}</>
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<>
					{list.length > 0 ? (
						<ul className={styles.list}>
							{list.map(({ id, value, date }) => {
								return (
									<li className={styles['list-item']} key={id}>
										{value} - {date}
									</li>
								);
							})}
						</ul>
					) : (
						<p className={styles['no-margin-text']}>
							Нет добавленных элементов
						</p>
					)}
				</>
			</div>
		</div>
	);
};
