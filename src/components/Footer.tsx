export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 RollerCoin Simulation. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Virtual Currency Only</span>
            <span>•</span>
            <span>Educational Purpose</span>
            <span>•</span>
            <span>Future Crypto Integration Ready</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground text-center">
          This is a simulation application. No real cryptocurrency is involved.
        </div>
      </div>
    </footer>
  )
}
