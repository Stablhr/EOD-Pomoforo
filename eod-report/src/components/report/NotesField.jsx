import { Note } from '../icons'

export default function NotesField({ value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
        <Note className="w-4 h-4 text-indigo-500" />
        Important Notes / Needs
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Blockers, follow-ups, requests for the client..."
        rows={3}
        className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
      />
    </div>
  )
}
