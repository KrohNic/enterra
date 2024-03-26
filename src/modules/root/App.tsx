import { useRef } from 'react';
import styles from './App.module.css';

export function App() {
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const squareRef = useRef<HTMLDivElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);

	const onStartAnim = () => {
		const { top, width } = squareRef.current!.getBoundingClientRect();

		// @ts-ignore
		circleRef.current!.style.left = `${parseInt(width / 2)}px`;
		// @ts-ignore
		circleRef.current!.style.top = `${parseInt(top)}px`;
		circleRef.current!.style.display = 'block';

		circleRef.current!.addEventListener(
			'transitionend',
			() => {
				circleRef.current!.style.display = 'none';
			},
			{ once: true }
		);

		setTimeout(() => {
			circleRef.current!.style.left = 'calc(100% - 35px)';
			circleRef.current!.style.top = '50%';
		});

		btnRef.current!.disabled = true;
		btnRef.current!.innerText = '5';

		const interval = setInterval(() => {
			const currentTimer = btnRef.current!.innerText;

			if (currentTimer === '1') {
				btnRef.current!.disabled = false;
				btnRef.current!.innerText = 'START';
				clearInterval(interval);
			} else {
				btnRef.current!.innerText = `${+currentTimer - 1}`;
			}
		}, 1000);
	};

	return (
		<div className={styles.screen}>
			<div className={styles.board}>
				<div className={styles.square}>2</div>

				<div
					className={`${styles.square} ${styles.first}`}
					ref={squareRef}
				>
					1
				</div>

				<div
					className={styles.circle}
					ref={circleRef}
				/>
			</div>

			<button
				type='button'
				className={styles.btn}
				onClick={onStartAnim}
				ref={btnRef}
			>
				START
			</button>
		</div>
	);
}
