'use client'

import { Card } from '@/components/ui/Card'
import { Download, Filter, Calendar } from 'lucide-react'

const reports = [
  { title: 'Monthly Sales Report', description: 'Detailed sales performance for the current month', date: 'Jan 15, 2024', format: 'PDF' },
  { title: 'User Analytics Report', description: 'User behavior and engagement metrics', date: 'Jan 14, 2024', format: 'Excel' },
  { title: 'Financial Summary', description: 'Quarterly financial performance overview', date: 'Jan 10, 2024', format: 'PDF' },
  { title: 'Marketing Campaign Results', description: 'Performance analysis of recent marketing campaigns', date: 'Jan 8, 2024', format: 'Excel' },
]

export default function Reports() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
      <p className="text-gray-600 mb-6">Generate and download detailed reports</p>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <p className="text-gray-600 mt-1">{report.description}</p>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                {report.format}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Generated on {report.date}</span>
              <button className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
