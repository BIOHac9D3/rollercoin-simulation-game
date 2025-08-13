'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useGame } from '@/context/GameContext'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/mining', label: 'Mining' },
  { href: '/rigs', label: 'Rigs' },
  { href: '/games', label: 'Games' },
]

export function Navigation() {
  const pathname = usePathname()
  const { state } = useGame()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              RollerCoin Sim
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              <span className="text-muted-foreground">Balance:</span>{' '}
              <span className="text-foreground">
                {state.virtualCurrency.toFixed(2)} BTC
              </span>
            </div>
            <div className="text-sm font-medium">
              <span className="text-muted-foreground">Power:</span>{' '}
              <span className="text-foreground">
                {state.miningPower.toFixed(1)} TH/s
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
