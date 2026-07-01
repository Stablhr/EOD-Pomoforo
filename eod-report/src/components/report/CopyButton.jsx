import { Copy, Checkmark } from '../icons'

const Spinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export default function CopyButton({ loading, copied, onCopy, disabled }) {
  return (
    <button
      onClick={onCopy}
      disabled={disabled}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
        loading
          ? 'bg-indigo-500 text-white/80 cursor-wait'
          : copied
          ? 'bg-green-100/50 text-green-700 border border-green-300/50'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md shadow-sm'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <><Spinner className="w-4 h-4" /> Copying...</>
      ) : copied ? (
        <><Checkmark className="w-4 h-4" /> Copied!</>
      ) : (
        <><Copy className="w-4 h-4" /> Copy to Clipboard</>
      )}
    </button>
  )
}
