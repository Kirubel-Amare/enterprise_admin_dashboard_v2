interface CardProps {
  title: string
  value: string
  description: string
}

export function Card({ title, value, description }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-green-600 mt-1">{description}</p>
    </div>
  )
}