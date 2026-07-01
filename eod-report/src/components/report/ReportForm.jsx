import { useState, useEffect } from 'react'
import { Calendar } from '../icons'
import TaskList from './TaskList'
import TotalHours from './TotalHours'
import NotesField from './NotesField'
import ReportPreview from './ReportPreview'
import CopyButton from './CopyButton'
import { formatReport } from '../../utils/formatReport'
import { formatDate } from '../../utils/formatDate'
import { useClipboard } from '../../hooks/useClipboard'

function todayString() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function ReportForm({ initialReport, onSave, onClearLoad }) {
  const [date, setDate] = useState(todayString())
  const [tasks, setTasks] = useState([{ id: 1, name: '', hours: '' }])
  const [notes, setNotes] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const { copy, copied } = useClipboard()

  useEffect(() => {
    if (initialReport) {
      setDate(initialReport.date)
      setTasks(initialReport.tasks.map((t, i) => ({ ...t, id: i + 1 })))
      setNotes(initialReport.notes || '')
    }
  }, [initialReport])

  const totalHours = tasks.reduce((sum, t) => sum + (Number(t.hours) || 0), 0)
  const formattedDate = formatDate(date)
  const hasContent = tasks.some(t => t.name.trim()) || notes.trim()

  const reportText = formatReport({
    date: formattedDate,
    tasks,
    notes,
  })

  const handleSave = () => {
    onSave({
      date,
      tasks: tasks.filter(t => t.name.trim()).map(t => ({ name: t.name.trim(), hours: Number(t.hours) || 0 })),
      notes,
      totalHours,
    })
  }

  const handleClear = () => {
    if (!confirmClear && hasContent) {
      setConfirmClear(true)
      return
    }
    setDate(todayString())
    setTasks([{ id: Date.now(), name: '', hours: '' }])
    setNotes('')
    setConfirmClear(false)
    onClearLoad()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4 text-indigo-500" />
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
        />
      </div>

      <div className="space-y-3">
        <TaskList tasks={tasks} onChange={setTasks} />
        <TotalHours tasks={tasks} />
      </div>

      <NotesField value={notes} onChange={setNotes} />

      <div className="space-y-3">
        <ReportPreview report={reportText} />
        <div className="flex gap-2">
          <CopyButton copied={copied} onCopy={() => copy(reportText)} />
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Save Report
          </button>
          {hasContent && (
            <button
              onClick={handleClear}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ml-auto ${
                confirmClear
                  ? 'text-red-600 bg-red-50 border border-red-200'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              {confirmClear ? 'Clear anyway?' : 'Clear'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
