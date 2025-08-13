'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useGame } from '@/context/GameContext'

interface GameStats {
  clicks: number
  score: number
  timeLeft: number
  isActive: boolean
  powerBonus: number
}

export default function GamesPage() {
  const { increaseMiningPower, addEarnings } = useGame()
  const [clickerGame, setClickerGame] = useState<GameStats>({
    clicks: 0,
    score: 0,
    timeLeft: 30,
    isActive: false,
    powerBonus: 0
  })
  const [gameHistory, setGameHistory] = useState<Array<{
    date: Date
    score: number
    bonus: number
  }>>([])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (clickerGame.isActive && clickerGame.timeLeft > 0) {
      interval = setInterval(() => {
        setClickerGame(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }))
      }, 1000)
    } else if (clickerGame.isActive && clickerGame.timeLeft === 0) {
      endGame()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [clickerGame.isActive, clickerGame.timeLeft])

  const startClickerGame = () => {
    setClickerGame({
      clicks: 0,
      score: 0,
      timeLeft: 30,
      isActive: true,
      powerBonus: 0
    })
  }

  const handleClick = () => {
    if (!clickerGame.isActive || clickerGame.timeLeft <= 0) return

    const basePoints = 1
    const comboMultiplier = Math.min(1 + (clickerGame.clicks / 50), 3) // Max 3x multiplier
    const points = Math.floor(basePoints * comboMultiplier)

    setClickerGame(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
      score: prev.score + points
    }))
  }

  const endGame = () => {
    const finalScore = clickerGame.score
    const powerBonus = Math.floor(finalScore / 10) * 0.1 // 0.1 TH/s per 10 points
    const earningsBonus = Math.floor(finalScore / 20) * 0.001 // 0.001 BTC per 20 points

    // Apply bonuses
    if (powerBonus > 0) {
      increaseMiningPower(powerBonus)
    }
    if (earningsBonus > 0) {
      addEarnings(earningsBonus)
    }

    // Update game history
    const newGameRecord = {
      date: new Date(),
      score: finalScore,
      bonus: powerBonus
    }
    setGameHistory(prev => [newGameRecord, ...prev.slice(0, 9)]) // Keep last 10 games

    setClickerGame(prev => ({
      ...prev,
      isActive: false,
      powerBonus
    }))
  }

  const resetGame = () => {
    setClickerGame({
      clicks: 0,
      score: 0,
      timeLeft: 30,
      isActive: false,
      powerBonus: 0
    })
  }

  const getClicksPerSecond = () => {
    if (clickerGame.timeLeft === 30) return 0
    const elapsed = 30 - clickerGame.timeLeft
    return elapsed > 0 ? (clickerGame.clicks / elapsed).toFixed(1) : '0'
  }

  const getCurrentMultiplier = () => {
    return Math.min(1 + (clickerGame.clicks / 50), 3).toFixed(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Mini-Games</h1>
          <p className="text-muted-foreground">
            Play games to earn mining power bonuses and extra rewards
          </p>
        </div>

        {/* Clicker Game */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Hash Rate Clicker</CardTitle>
            <CardDescription>
              Click as fast as you can to earn mining power bonuses!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{clickerGame.clicks}</div>
                <div className="text-sm text-muted-foreground">Clicks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{clickerGame.score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{clickerGame.timeLeft}s</div>
                <div className="text-sm text-muted-foreground">Time Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{getCurrentMultiplier()}x</div>
                <div className="text-sm text-muted-foreground">Multiplier</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Game Progress</span>
                <span>{getClicksPerSecond()} clicks/sec</span>
              </div>
              <Progress 
                value={((30 - clickerGame.timeLeft) / 30) * 100} 
                className="h-2"
              />
            </div>

            {/* Game Area */}
            <div className="text-center space-y-4">
              {!clickerGame.isActive ? (
                <div className="space-y-4">
                  {clickerGame.score > 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Game Complete!
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Score: {clickerGame.score} | Mining Power Bonus: +{clickerGame.powerBonus.toFixed(1)} TH/s
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    size="lg" 
                    onClick={startClickerGame}
                    className="w-full max-w-xs"
                  >
                    Start Game
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={handleClick}
                    className="w-32 h-32 rounded-full text-xl font-bold"
                    disabled={clickerGame.timeLeft <= 0}
                  >
                    CLICK!
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Click the button as fast as you can!
                  </div>
                </div>
              )}
            </div>

            {/* Game Instructions */}
            <div className="text-sm text-muted-foreground space-y-2">
              <h4 className="font-semibold">How to Play:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Click the button as many times as possible in 30 seconds</li>
                <li>• Your multiplier increases with more clicks (up to 3x)</li>
                <li>• Earn 0.1 TH/s mining power for every 10 points</li>
                <li>• Earn 0.001 BTC bonus for every 20 points</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Game History */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
            <CardDescription>
              Your last 10 game sessions and rewards earned
            </CardDescription>
          </CardHeader>
          <CardContent>
            {gameHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No games played yet. Start your first game above!
              </div>
            ) : (
              <div className="space-y-3">
                {gameHistory.map((game, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <div className="font-medium">Score: {game.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {game.date.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        +{game.bonus.toFixed(1)} TH/s
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Mining Power
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coming Soon Games */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>More Games Coming Soon</CardTitle>
            <CardDescription>
              Additional mini-games will be added in future updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg opacity-50">
                <h3 className="font-semibold mb-2">Memory Match</h3>
                <p className="text-sm text-muted-foreground">
                  Match pairs of mining equipment to earn bonuses
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg opacity-50">
                <h3 className="font-semibold mb-2">Hash Puzzle</h3>
                <p className="text-sm text-muted-foreground">
                  Solve cryptographic puzzles for mining rewards
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg opacity-50">
                <h3 className="font-semibold mb-2">Market Trader</h3>
                <p className="text-sm text-muted-foreground">
                  Buy and sell virtual crypto at the right time
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg opacity-50">
                <h3 className="font-semibold mb-2">Rig Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Assemble mining rigs in a time-based challenge
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
