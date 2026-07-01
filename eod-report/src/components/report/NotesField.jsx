import { Note } from '../icons'

export default function NotesField({ value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <Note className="w-3.5 h-3.5 text-indigo-500" />
        Notes
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Blockers, follow-ups, requests for the client..."
        rows={3}
        className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none bg-stone-50 hover:bg-white focus:bg-white"
      />
    </div>
  )
}
