import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface OpacityAnimationInterface {
  children: ReactNode;
  delay?: number;
}

export default function OpacityAnimation({ children, delay = 0.3 }: OpacityAnimationInterface) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, type: 'tween', stiffness: 10000 }}
			style={{ width: '100%' }}
		>
			{children}
		</motion.div>
	);
}
