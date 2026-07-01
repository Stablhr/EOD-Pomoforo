import { Clipboard } from '../icons'

export default function ReportPreview({ report }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
        <Clipboard className="w-4 h-4 text-indigo-500" />
        Preview
      </label>
      <pre className="w-full px-4 py-3 bg-stone-200/50 border border-stone-200 rounded-xl text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed min-h-[120px]">
        {report || 'Fill in the fields above to preview your report.'}
      </pre>
    </div>
  )
}
