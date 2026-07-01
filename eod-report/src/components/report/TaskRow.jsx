import { Trash } from '../icons'
import { formatHours } from '../../utils/formatHours'

export default function TaskRow({ task, onChange, onDelete }) {
  const hrs = Number(task.hours) || 0

  return (
    <div className="flex items-center gap-2 group">
      <input
        type="text"
        value={task.name}
        onChange={e => onChange(task.id, 'name', e.target.value)}
        placeholder="Task name"
        className="flex-1 px-3 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-stone-50 hover:bg-white focus:bg-white"
      />
      <input
        type="number"
        value={task.hours}
        onChange={e => onChange(task.id, 'hours', e.target.value)}
        step="0.25"
        min="0"
        placeholder="0"
        className="w-16 px-2 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-center bg-stone-50 hover:bg-white focus:bg-white"
      />
      <span className="text-xs text-gray-400 w-14 shrink-0">{hrs > 0 ? formatHours(hrs) : 'hrs'}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-100/50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete task"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  )
}
