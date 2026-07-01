import { Trash } from '../icons'

export default function TaskRow({ task, onChange, onDelete }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={task.name}
        onChange={e => onChange(task.id, 'name', e.target.value)}
        placeholder="Task name"
        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
      />
      <input
        type="number"
        value={task.hours}
        onChange={e => onChange(task.id, 'hours', e.target.value)}
        step="0.25"
        min="0"
        placeholder="0"
        className="w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-center"
      />
      <span className="text-xs text-gray-400 w-6">hrs</span>
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
        aria-label="Delete task"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  )
}
