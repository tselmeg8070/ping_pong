"use client";
import { useState } from 'react';
import { Stage, Container, Sprite, useTick } from '@pixi/react';

interface MotionDataInterface {
	x: number;
	y: number;
	rotation: number;
	anchor: number;
}

interface SpeedInterface {
	x: number;
	y: number;
}

interface MotionInterface {
	data: MotionDataInterface
}

let iter = 0;

const Ball = ({ speed, option, setBallOption }:
	{
		speed: SpeedInterface;
		option: MotionDataInterface,
		setBallOption: (option: MotionDataInterface) => void
	}) => {

	const [motion, update] = useState<MotionDataInterface>(option);
	const [motionSpeed, setMotionSpeed] = useState<SpeedInterface>(speed);

	useTick((delta: number) => {
		iter += (0.05 * delta);
		if ((motion.x >= 800 && motionSpeed.x > 0) || (motion.x <= 0 && motionSpeed.x < 0))
			setMotionSpeed({
				x: motionSpeed.x * (-1),
				y: motionSpeed.y,
			});
		update({
			x: motion.x + motionSpeed.x,
			y: motion.y + motionSpeed.y,
			rotation: Math.sin(iter) * Math.PI,
			anchor: 0.5,
		});
		setBallOption(motion);
	});

	return <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" {...motion} height={50} width={50}/>;
};

export default function Home() {
	const [ballOption, setBallOption] = useState<MotionDataInterface>({
		x: 400,
		y: 400,
		rotation: 0,
		anchor: 0
	})
	return (
		<Stage width={800} height={700} options={{ autoDensity: true, backgroundColor: 0x01262a }}>
			<Ball speed={{ x: 1, y: 0 }} option={ballOption} setBallOption={setBallOption}/>
		</Stage>
	);
};
