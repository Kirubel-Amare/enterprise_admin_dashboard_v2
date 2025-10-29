import { ReactNode } from 'react'

interface CardProps {
  title: string
  value: string
  description: string
  icon?: ReactNode
}

export function Card({ title, value, description, icon }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1">{description}</p>
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}