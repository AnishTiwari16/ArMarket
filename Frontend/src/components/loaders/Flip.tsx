import { motion } from 'framer-motion';

export default function SpinningCubeLoader() {
    const cubeVariants = {
        spin: {
            rotateX: 360,
            rotateY: 360,
            transition: {
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
            },
        },
    };

    return (
        <div className="mt-4 mb-6 flex items-center justify-center">
            <motion.div
                className="size-12 rounded-2xl bg-[#9078c0]"
                variants={cubeVariants}
                animate="spin"
                style={{ perspective: 200 }}
            ></motion.div>
        </div>
    );
}
