// Este es el componente del Logo.
// Se ha modificado para usar una imagen PNG desde la carpeta 'public'.
export const Logo = (props: { className?: string }) => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        aria-label="VictorCodex Logo"
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FBBF24" /> 
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
                <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-1.5; 1.5; -1.5"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </linearGradient>
        </defs>

        {/* Círculo con fondo negro. Empieza cuando la V casi termina. */}
        <circle
            cx="60"
            cy="60"
            r="50"
            fill="black"
            stroke="url(#logo-gradient)"
            strokeWidth="4"
            strokeDasharray="315"
            strokeDashoffset="315"
        >
            <animate
                attributeName="stroke-dashoffset"
                values="315; 315; 0; 0"
                keyTimes="0; 0.125; 0.29; 1"
                dur="12s"
                repeatCount="indefinite"
            />
        </circle>

        {/* V con animación de escritura. La animación dura 2s, y espera 10s. */}
        <path
          d="M45 40 L 60 80 L 75 40"
          stroke="url(#logo-gradient)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          strokeDasharray="86"
          strokeDashoffset="86"
        >
            <animate
                attributeName="stroke-dashoffset"
                values="86; 0; 0"
                keyTimes="0; 0.17; 1"
                dur="12s"
                repeatCount="indefinite"
            />
        </path>
    </svg>
);
