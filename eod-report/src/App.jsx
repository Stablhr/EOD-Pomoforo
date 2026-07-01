import { useState } from 'react'
import Header from './components/layout/Header'
import TabSwitcher from './components/layout/TabSwitcher'
import ReportForm from './components/report/ReportForm'
import PomodoroTimer from './components/pomodoro/PomodoroTimer'
import HistoryDrawer from './components/history/HistoryDrawer'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState('report')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [reports, setReports] = useLocalStorage('eod_reports_v1', [])
  const [author, setAuthor] = useLocalStorage('eod_author', '')
  const [loadedReport, setLoadedReport] = useState(null)

  const handleSaveReport = (report) => {
    const entry = { ...report, id: Date.now(), createdAt: new Date().toISOString() }
    setReports(prev => [entry, ...prev])
  }

  const handleLoadReport = (report) => {
    setLoadedReport(report)
  }

  const handleDeleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-stone-100 text-gray-800 font-sans">
      <Header onHistoryToggle={() => setHistoryOpen(!historyOpen)} />
      <div className="flex relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.03),transparent_50%)]" />
        <HistoryDrawer
          open={historyOpen}
          reports={reports}
          onLoad={handleLoadReport}
          onDelete={handleDeleteReport}
          onClose={() => setHistoryOpen(false)}
        />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-6">
          <TabSwitcher active={activeTab} onChange={setActiveTab} />
          <div className="mt-6">
            {activeTab === 'report' ? (
              <ReportForm
                key={loadedReport?.id || 'new'}
                initialReport={loadedReport}
                author={author}
                onAuthorChange={setAuthor}
                onSave={handleSaveReport}
                onClearLoad={() => setLoadedReport(null)}
              />
            ) : (
              <PomodoroTimer />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
