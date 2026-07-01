const BUBBLES = {
  idle: null,
  happy: 'Great work!',
  sleepy: 'Break time... zzz',
  focused: 'You got this!',
  celebrating: 'Report saved!',
}

export default function SlothMascot({ mood = 'idle', onClick, mascotSrc }) {
  const bubble = BUBBLES[mood]

  const animClass = mood === 'idle' ? 'animate-float'
    : mood === 'sleepy' ? 'animate-sleep'
    : mood === 'focused' ? 'animate-pulse-soft'
    : ''

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-1.5 select-none">
      {bubble && (
        <div className="px-3 py-1.5 rounded-xl bg-white shadow-xs border border-stone-200 text-xs font-medium text-gray-600 whitespace-nowrap animate-fade-in-up">
          {bubble}
        </div>
      )}
      <button
        onClick={onClick}
        className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-stone-200 p-1 cursor-pointer hover:shadow-md hover:border-indigo-200 active:scale-90 transition-all duration-200"
      >
        <img
          src={mascotSrc}
          alt="Mascot"
          className={`w-full h-full object-cover rounded-lg ${animClass}`}
          draggable={false}
        />
      </button>
    </div>
  )
}
