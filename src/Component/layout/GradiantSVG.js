function GradientSVG() {
    const idCSS = "hello";
    const gradientTransform = `rotate(32)`;
    return (
        <svg style={{ height: 0 }}>
            <defs>
                <linearGradient id={idCSS} gradientTransform={gradientTransform}>
                    <stop offset="16.29%" stopColor="var(--secondary)" />
                    <stop offset="85.56%" stopColor="var(--primary)" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default GradientSVG;
