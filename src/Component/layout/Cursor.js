
import React from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

export const Cursor = () => {


    return (
        <>
            <Cursorz />
        </>
    )
}



const Cursorz = (props) => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = {
        damping: 20,
        stiffness: 700,
        mass: 1
    };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    React.useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };

    }, []);

    return (
        <motion.div

            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            className="cursorMain">
            {!props.hideCursor == true ?
                <motion.div layoutId="cursor" className="">
                </motion.div>
                :
                null
            }
        </motion.div>
    )
}
