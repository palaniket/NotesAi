"use client"

import { useEffect, useState } from "react"
import { Sparkles, FileText, PenTool, Brain, MessageSquare, Star } from "lucide-react"

export default function FloatingBackground() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Create floating items
    const newItems = []
    const itemCount = window.innerWidth < 768 ? 10 : 20

    const colors = [
      "text-white/20",
      "text-yellow-200/30",
      "text-blue-200/30",
      "text-pink-200/30",
      "text-green-200/30",
      "text-purple-200/30",
    ]

    for (let i = 0; i < itemCount; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        icon: Math.floor(Math.random() * 6),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setItems(newItems)

    // Animation loop
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          y: (item.y - item.speed) % 100,
          rotation: (item.rotation + item.rotationSpeed) % 360,
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const renderIcon = (iconIndex, size, color) => {
    const iconSize = Math.floor(size * 24)
    const props = { size: iconSize, className: color }

    switch (iconIndex) {
      case 0:
        return <FileText {...props} />
      case 1:
        return <PenTool {...props} />
      case 2:
        return <Brain {...props} />
      case 3:
        return <MessageSquare {...props} />
      case 4:
        return <Sparkles {...props} />
      default:
        return <Star {...props} />
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `rotate(${item.rotation}deg)`,
            opacity: 0.7,
          }}
        >
          {renderIcon(item.icon, item.size, item.color)}
        </div>
      ))}
    </div>
  )
}
