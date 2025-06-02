import { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const start = 0;
        const end = value;
        const increment = Math.ceil(end / (duration / 16));
        let current = start;

        const step = () => {
            current += increment;
            if (current >= end) {
                setDisplay(end);
            } else {
                setDisplay(current);
                requestAnimationFrame(step);
            }
        };
        step();

    }, [value, duration]);

    return <span>{display}</span>;
}

export default AnimatedNumber;