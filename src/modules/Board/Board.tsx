import { useRef } from 'react';
import styles from './Board.module.css';

export const Board = () => {
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const squareRef = useRef<HTMLDivElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);

	const onStartAnim = () => {
		const { top, width } = squareRef.current!.getBoundingClientRect();
		const squareHalfSize = parseInt((width / 2) as unknown as string);
		const squareTop = parseInt(top as unknown as string);

		circleRef.current!.style.top = `${squareTop}px`;
		circleRef.current!.style.left = `${squareHalfSize}px`;
		circleRef.current!.style.display = 'block';
		circleRef.current!.style.animationName = styles.toSecondBlock;

		circleRef.current!.addEventListener(
			'animationend',
			() => {
				circleRef.current!.style.display = 'none';
			},
			{ once: true }
		);

		btnRef.current!.disabled = true;
		btnRef.current!.innerText = '5';

		const interval = setInterval(() => {
			if (!btnRef.current) {
				clearInterval(interval);
				return;
			}

			const currentTimer = btnRef.current.innerText;

			if (currentTimer === '1') {
				btnRef.current.disabled = false;
				btnRef.current.innerText = 'START';
				clearInterval(interval);
			} else {
				btnRef.current.innerText = `${+currentTimer - 1}`;
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
};
