import { Clipboard } from '../icons'

export default function ReportPreview({ report }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <Clipboard className="w-3.5 h-3.5 text-indigo-500" />
        Preview
      </label>
      <pre className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed min-h-[120px] focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all duration-200">
        {report || (
          <span className="text-gray-400 font-sans">Fill in the fields above to preview your report.</span>
        )}
      </pre>
    </div>
  )
}
