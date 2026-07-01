import { useState, useEffect, useRef } from 'react'
import { Calendar, Checkmark } from '../icons'
import { CornerDeco } from '../illustrations'
import notesBg from '../../assets/images.png'
import TaskList from './TaskList'
import TotalHours from './TotalHours'
import NotesField from './NotesField'
import CopyButton from './CopyButton'
import ThemePicker from '../settings/ThemePicker'
import { formatReport } from '../../utils/formatReport'
import { formatDate } from '../../utils/formatDate'
import { getTheme } from '../../themes'

function todayString() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const Spinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export default function ReportForm({ initialReport, onSave, onClearLoad, author, onAuthorChange, onCelebrate, theme = 'sloth', onThemeChange }) {
  const currentTheme = getTheme(theme)
  const [date, setDate] = useState(todayString())
  const [tasks, setTasks] = useState([{ id: Date.now(), name: '', hours: '' }])
  const [notes, setNotes] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copyLoading, setCopyLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (initialReport) {
      setDate(initialReport.date)
      setTasks(initialReport.tasks.map((t, i) => ({ ...t, id: Date.now() + i })))
      setNotes(initialReport.notes || '')
    }
  }, [initialReport])

  const saveRef = useRef(null)
  const copyRef = useRef(null)

  useEffect(() => {
    saveRef.current = handleSave
    copyRef.current = handleCopyScreenshot
  })

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        saveRef.current?.()
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
        copyRef.current?.()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const totalHours = tasks.reduce((sum, t) => sum + (Number(t.hours) || 0), 0)
  const formattedDate = formatDate(date)
  const hasContent = tasks.some(t => t.name.trim()) || notes.trim()

  const reportText = formatReport({
    date: formattedDate,
    tasks,
    notes,
    author,
    reportStyle: currentTheme.reportStyle,
  })

  const handleSave = () => {
    setSaveLoading(true)
    onSave({
      date,
      tasks: tasks.filter(t => t.name.trim()).map(t => ({ name: t.name.trim(), hours: Number(t.hours) || 0 })),
      notes,
      totalHours,
      author,
    })
    setSaved(true)
    setToast('Report saved!')
    onCelebrate?.()
    setTimeout(() => setSaved(false), 2000)
    setSaveLoading(false)
  }

  const handleCopyScreenshot = async () => {
    setCopyLoading(true)
    try {
      const text = formatReport({ date: formattedDate, tasks, notes, author, reportStyle: currentTheme.reportStyle })
      const lines = text.split('\n')
      const fontSize = 14
      const padding = 24
      const lineHeight = fontSize * 1.6
      const canvasWidth = 480
      const canvasHeight = lines.length * lineHeight + padding * 2

      const canvas = document.createElement('canvas')
      const r = 12
      canvas.width = canvasWidth * 2
      canvas.height = canvasHeight * 2
      const ctx = canvas.getContext('2d')
      ctx.scale(2, 2)

      ctx.beginPath()
      ctx.roundRect(0, 0, canvasWidth, canvasHeight, r)
      ctx.fillStyle = '#EDE8DD'
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.roundRect(0, 0, canvasWidth, canvasHeight, r)
      ctx.clip()

      const img = new Image()
      img.src = currentTheme.mascot
      await img.decode()
      const s = 56
      ctx.drawImage(img, canvasWidth - s - 8, canvasHeight - s - 8, s, s)
      ctx.restore()

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
        } else if (lines[i].endsWith(':') && !lines[i].startsWith('-')) {
          ctx.font = '600 14px Inter, system-ui, sans-serif'
          ctx.fillText(lines[i], padding, y)
          ctx.font = '400 14px Inter, system-ui, sans-serif'
        } else if (lines[i].startsWith('— ')) {
          ctx.fillStyle = '#78716C'
          ctx.font = '400 14px Inter, system-ui, sans-serif'
          ctx.fillText(lines[i], padding, y)
          ctx.fillStyle = '#1C1917'
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
      await copyText(formatReport({ date: formattedDate, tasks, notes, author, reportStyle: currentTheme.reportStyle }))
    }
    setCopyLoading(false)
    setCopied(true)
    setToast('Copied!')
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

        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name / Signature
            </label>
            <input
              type="text"
              value={author}
              onChange={e => onAuthorChange(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-stone-50"
            />
          </div>
          <ThemePicker theme={theme} onChange={onThemeChange} />
        </div>

        <div className="space-y-3">
          <TaskList tasks={tasks} onChange={setTasks} />
          <TotalHours tasks={tasks} />
        </div>
        <img
          src={currentTheme.mascot}
          alt=""
          className="absolute -bottom-3 -right-3 w-28 h-28 object-cover rounded-xl opacity-[0.35] pointer-events-none select-none"
          draggable={false}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(${notesBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative">
          <NotesField value={notes} onChange={setNotes} />
        </div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 mt-4">
          <CopyButton loading={copyLoading} copied={copied} onCopy={handleCopyScreenshot} disabled={copyLoading || copied} />
          <button
            onClick={handleSave}
            disabled={saveLoading || saved}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              saved
                ? 'bg-green-100/50 text-green-700 border border-green-300/50 scale-105'
                : saveLoading
                ? 'bg-stone-100 text-gray-400 border border-stone-200 cursor-not-allowed'
                : 'bg-stone-100 text-gray-700 hover:bg-stone-200 border border-stone-200 active:scale-95'
            }`}
          >
            {saveLoading ? (
              <><Spinner className="w-4 h-4" /> Saving...</>
            ) : saved ? (
              <><Checkmark className="w-4 h-4" /> Saved</>
            ) : (
              'Save Report'
            )}
          </button>
          {hasContent && (
            <button
              onClick={handleClear}
              disabled={saveLoading || copyLoading}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ml-auto ${
                confirmClear
                  ? 'text-red-600 bg-red-50 border border-red-200'
                  : 'text-gray-400 hover:text-red-500'
              } ${(saveLoading || copyLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {confirmClear ? 'Clear anyway?' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-lg animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  )
}
