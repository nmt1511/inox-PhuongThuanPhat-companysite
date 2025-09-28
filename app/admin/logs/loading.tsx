export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border animate-pulse">
            <div className="flex justify-between items-start mb-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
