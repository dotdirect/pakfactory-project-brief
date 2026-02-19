'use client'

interface ProductIconProps {
  productType?: string | null
  className?: string
}

// Map productType to high-end visual icons
export default function ProductIcon({ productType, className = '' }: ProductIconProps) {
  // Handle undefined/null productType
  if (!productType) {
    // Return default icon when productType is not available
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Generic box - isometric view */}
          <path d="M 30 40 L 50 30 L 70 40 L 70 70 L 50 80 L 30 70 Z" strokeWidth="2" />
          <path d="M 50 30 L 50 80" strokeWidth="2" />
          <path d="M 30 40 L 30 70" strokeWidth="2" />
          <path d="M 70 40 L 70 70" strokeWidth="2" />
          <path d="M 30 40 L 50 30" strokeWidth="1" strokeDasharray="1,1" />
          <path d="M 70 40 L 50 30" strokeWidth="1" strokeDasharray="1,1" />
        </svg>
      </div>
    )
  }

  const normalizedType = productType.toLowerCase().trim()

  // Rigid Box schematic icon
  if (normalizedType.includes('rigid') || normalizedType.includes('box')) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Rigid Box schematic - top view */}
          <rect x="20" y="20" width="60" height="60" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" strokeWidth="1" strokeDasharray="2,2" />
          {/* Corner flaps */}
          <line x1="20" y1="20" x2="15" y2="15" strokeWidth="1.5" />
          <line x1="80" y1="20" x2="85" y2="15" strokeWidth="1.5" />
          <line x1="20" y1="80" x2="15" y2="85" strokeWidth="1.5" />
          <line x1="80" y1="80" x2="85" y2="85" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }

  // Folding Carton icon
  if (normalizedType.includes('carton') || normalizedType.includes('folding')) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Folding Carton - unfolded view */}
          <rect x="30" y="15" width="40" height="20" strokeWidth="2" />
          <rect x="15" y="35" width="20" height="30" strokeWidth="2" />
          <rect x="35" y="35" width="30" height="30" strokeWidth="2" />
          <rect x="65" y="35" width="20" height="30" strokeWidth="2" />
          <rect x="30" y="65" width="40" height="20" strokeWidth="2" />
          {/* Fold lines */}
          <line x1="30" y1="35" x2="30" y2="65" strokeWidth="1" strokeDasharray="1,1" />
          <line x1="65" y1="35" x2="65" y2="65" strokeWidth="1" strokeDasharray="1,1" />
        </svg>
      </div>
    )
  }

  // Pouch/Pouch Pack icon
  if (normalizedType.includes('pouch')) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Pouch shape */}
          <path
            d="M 30 25 Q 30 20 35 20 L 65 20 Q 70 20 70 25 L 70 75 Q 70 80 65 80 L 35 80 Q 30 80 30 75 Z"
            strokeWidth="2"
          />
          {/* Seal line */}
          <line x1="30" y1="25" x2="70" y2="25" strokeWidth="1.5" />
          {/* Contents indication */}
          <ellipse cx="50" cy="50" rx="15" ry="20" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>
    )
  }

  // Bag/Sack icon
  if (normalizedType.includes('bag') || normalizedType.includes('sack')) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Bag shape */}
          <path
            d="M 35 25 L 35 20 Q 35 15 40 15 L 60 15 Q 65 15 65 20 L 65 25 L 70 25 L 70 75 Q 70 80 65 80 L 35 80 Q 30 80 30 75 L 30 25 Z"
            strokeWidth="2"
          />
          {/* Handles */}
          <path d="M 40 25 Q 40 20 45 20 L 55 20 Q 60 20 60 25" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }

  // Default/Generic packaging icon
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Generic box - isometric view */}
        <path d="M 30 40 L 50 30 L 70 40 L 70 70 L 50 80 L 30 70 Z" strokeWidth="2" />
        <path d="M 50 30 L 50 80" strokeWidth="2" />
        <path d="M 30 40 L 30 70" strokeWidth="2" />
        <path d="M 70 40 L 70 70" strokeWidth="2" />
        <path d="M 30 40 L 50 30" strokeWidth="1" strokeDasharray="1,1" />
        <path d="M 70 40 L 50 30" strokeWidth="1" strokeDasharray="1,1" />
      </svg>
    </div>
  )
}

