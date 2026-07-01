import { useCallback } from 'react'
import TaskRow from './TaskRow'
import { Plus } from '../icons'

export default function TaskList({ tasks, onChange }) {
  const handleChange = (id, field, value) => {
    onChange(tasks.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const handleAdd = useCallback(() => {
    const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0)
    onChange([...tasks, { id: maxId + 1, name: '', hours: '' }])
  }, [tasks, onChange])

  const handleDelete = (id) => {
    if (tasks.length <= 1) return
    onChange(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          onChange={handleChange}
          onDelete={handleDelete}
        />
      ))}
      <button
        onClick={handleAdd}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 font-medium rounded-xl transition-all duration-200 active:scale-95 w-full"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </div>
  )
}
