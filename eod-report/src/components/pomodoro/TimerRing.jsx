export default function TimerRing({ timeRemaining, totalTime, size = 200, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = totalTime > 0 ? timeRemaining / totalTime : 0
  const offset = circumference * (1 - progress)

  return (
    <svg width={size} height={size} className="transform -rotate-90 drop-shadow-sm">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E7E5E4"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#6366F1"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        filter="url(#glow)"
        className="transition-all duration-300"
      />
    </svg>
  )
}
