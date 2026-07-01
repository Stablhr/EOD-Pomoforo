import { Copy, Checkmark } from '../icons'

export default function CopyButton({ copied, onCopy }) {
  return (
    <button
      onClick={onCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
        copied
          ? 'bg-green-100/50 text-green-700 border border-green-300/50'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
      }`}
    >
      {copied ? (
        <><Checkmark className="w-4 h-4" /> Copied!</>
      ) : (
        <><Copy className="w-4 h-4" /> Copy to Clipboard</>
      )}
    </button>
  )
}
