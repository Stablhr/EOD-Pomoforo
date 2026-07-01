import { useState, useEffect } from 'react'
import { Calendar } from '../icons'
import { CornerDeco, DecoDots } from '../illustrations'
import notesBg from '../../assets/images.png'
import slothImage from '../../assets/1697277f4bb2899ad61a17947f2b0656-cute-sloth-in-pixel-art-style.webp'
import TaskList from './TaskList'
import TotalHours from './TotalHours'
import NotesField from './NotesField'
import ReportPreview from './ReportPreview'
import CopyButton from './CopyButton'
import { formatReport } from '../../utils/formatReport'
import { formatDate } from '../../utils/formatDate'

function todayString() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function ReportForm({ initialReport, onSave, onClearLoad, author, onAuthorChange, onCelebrate }) {
  const [date, setDate] = useState(todayString())
  const [tasks, setTasks] = useState([{ id: Date.now(), name: '', hours: '' }])
  const [notes, setNotes] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (initialReport) {
      setDate(initialReport.date)
      setTasks(initialReport.tasks.map((t, i) => ({ ...t, id: Date.now() + i })))
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
    author,
  })

  const handleSave = () => {
    onSave({
      date,
      tasks: tasks.filter(t => t.name.trim()).map(t => ({ name: t.name.trim(), hours: Number(t.hours) || 0 })),
      notes,
      totalHours,
      author,
    })
    setSaved(true)
    onCelebrate?.()
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCopyScreenshot = async () => {
    try {
      const text = formatReport({ date: formattedDate, tasks, notes, author })
      const lines = text.split('\n')
      const fontSize = 14
      const padding = 24
      const lineHeight = fontSize * 1.6
      const canvasWidth = 480
      const canvasHeight = lines.length * lineHeight + padding * 2

      const canvas = document.createElement('canvas')
      canvas.width = canvasWidth * 2
      canvas.height = canvasHeight * 2
      const ctx = canvas.getContext('2d')
      ctx.scale(2, 2)

      ctx.fillStyle = '#F5F5F0'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      ctx.fillStyle = '#1C1917'
      ctx.font = '600 15px Inter, system-ui, sans-serif'
      ctx.fillText(lines[0], padding, padding + fontSize)

      let y = padding + fontSize + lineHeight
      ctx.font = '400 14px Inter, system-ui, sans-serif'
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith('Total Hours:')) {
          ctx.fillStyle = '#4F46E5'
          ctx.font = '600 14px Inter, system-ui, sans-serif'
          ctx.fillText(lines[i], padding, y)
          ctx.fillStyle = '#1C1917'
          ctx.font = '400 14px Inter, system-ui, sans-serif'
        } else if (lines[i].startsWith('— ')) {
          ctx.fillStyle = '#78716C'
          ctx.font = '400 14px Inter, system-ui, sans-serif'
          ctx.fillText(lines[i], padding, y)
        } else {
          ctx.fillText(lines[i], padding, y)
        }
        y += lineHeight
      }

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
        } catch {
          await copyText(text)
        }
      }
    } catch {
      await copyText(formatReport({ date: formattedDate, tasks, notes, author }))
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  const handleClear = () => {
    if (!confirmClear && hasContent) {
      setConfirmClear(true)
      return
    }
    setDate(todayString())
    setTasks([{ id: Date.now() + 1, name: '', hours: '' }])
    setNotes('')
    setConfirmClear(false)
    onClearLoad()
  }

  return (
    <div className="space-y-5">
      <div className="relative bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <CornerDeco className="w-full h-10" />
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-stone-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Name / Signature
          </label>
          <input
            type="text"
            value={author}
            onChange={e => onAuthorChange(e.target.value)}
            placeholder="Your name"
            className="px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-stone-50"
          />
        </div>

        <div className="space-y-3">
          <TaskList tasks={tasks} onChange={setTasks} />
          <TotalHours tasks={tasks} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(${notesBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative">
          <NotesField value={notes} onChange={setNotes} />
        </div>
      </div>

      <DecoDots className="w-full h-3 mx-auto" />

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
        <img
          src={slothImage}
          alt=""
          className="absolute -bottom-2 -right-2 w-16 h-16 object-contain opacity-[0.07] pointer-events-none select-none"
          draggable={false}
        />
        <ReportPreview report={reportText} />
        <div className="flex flex-wrap gap-2 pt-1">
          <CopyButton copied={copied} onCopy={handleCopyScreenshot} />
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              saved
                ? 'bg-green-100/50 text-green-700 border border-green-300/50 scale-105'
                : 'bg-stone-100 text-gray-700 hover:bg-stone-200 border border-stone-200 active:scale-95'
            }`}
          >
            {saved ? 'Report Saved' : 'Save Report'}
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
