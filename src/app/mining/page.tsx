'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useGame } from '@/context/GameContext'
import { MiningSimulator, MiningStats } from '@/lib/miningSimulator'

export default function MiningPage() {
  const { state, addEarnings, startMining, stopMining } = useGame()
  const [miningStats, setMiningStats] = useState<MiningStats | null>(null)
  const [simulator, setSimulator] = useState<MiningSimulator | null>(null)
  const [totalEarningsToday, setTotalEarningsToday] = useState(0)

  useEffect(() => {
    const miningSimulator = new MiningSimulator(
      (earnings) => {
        addEarnings(earnings)
        setTotalEarningsToday(prev => prev + earnings)
      },
      (stats) => {
        setMiningStats(stats)
      }
    )
    
    setSimulator(miningSimulator)

    return () => {
      miningSimulator.stop()
    }
  }, [addEarnings])

  const handleStartMining = () => {
    if (simulator && !state.isActive) {
      simulator.start(state.miningPower)
      startMining()
    }
  }

  const handleStopMining = () => {
    if (simulator && state.isActive) {
      simulator.stop()
      stopMining()
    }
  }

  const profitability = MiningSimulator.calculateProfitability(state.miningPower)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Mining Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your mining operation and track your earnings
          </p>
        </div>

        {/* Mining Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Mining Controls</CardTitle>
            <CardDescription>
              Start or stop your mining operation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold">
                  {state.isActive ? 'Mining Active' : 'Mining Stopped'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleStartMining} 
                  disabled={state.isActive}
                  variant={state.isActive ? 'secondary' : 'default'}
                >
                  Start Mining
                </Button>
                <Button 
                  onClick={handleStopMining} 
                  disabled={!state.isActive}
                  variant="outline"
                >
                  Stop Mining
                </Button>
              </div>
            </div>
            
            {state.isActive && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mining Progress</span>
                  <span>Active</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Mining Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.miningPower.toFixed(1)} TH/s</div>
              <p className="text-xs text-muted-foreground">
                Total hash rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.virtualCurrency.toFixed(6)} BTC</div>
              <p className="text-xs text-muted-foreground">
                Virtual currency
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.totalEarnings.toFixed(6)} BTC</div>
              <p className="text-xs text-muted-foreground">
                All-time earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEarningsToday.toFixed(6)} BTC</div>
              <p className="text-xs text-muted-foreground">
                Current session
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mining Statistics */}
        {miningStats && (
          <Card>
            <CardHeader>
              <CardTitle>Mining Statistics</CardTitle>
              <CardDescription>
                Detailed mining performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Hash Rate</p>
                  <p className="text-lg font-semibold">
                    {MiningSimulator.formatHashRate(miningStats.hashRate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Hourly Earnings</p>
                  <p className="text-lg font-semibold">
                    {miningStats.estimatedEarnings.toFixed(8)} BTC
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Network Difficulty</p>
                  <p className="text-lg font-semibold">
                    {miningStats.difficulty.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Reward</p>
                  <p className="text-lg font-semibold">
                    {miningStats.blockReward} BTC
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profitability Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Profitability Analysis</CardTitle>
            <CardDescription>
              Daily earnings and cost breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Daily Earnings</p>
                <p className="text-lg font-semibold text-green-600">
                  +{profitability.dailyEarnings.toFixed(6)} BTC
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Costs</p>
                <p className="text-lg font-semibold text-red-600">
                  -{profitability.dailyCosts.toFixed(6)} BTC
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Profit</p>
                <p className={`text-lg font-semibold ${profitability.dailyProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitability.dailyProfit > 0 ? '+' : ''}{profitability.dailyProfit.toFixed(6)} BTC
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Profit Margin</p>
              <Progress 
                value={Math.max(0, Math.min(100, (profitability.dailyProfit / profitability.dailyEarnings) * 100))} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {((profitability.dailyProfit / profitability.dailyEarnings) * 100).toFixed(1)}% profit margin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Boost your mining operation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <a href="/rigs">Manage Rigs</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/games">Play Mini-Games</a>
            </Button>
            <Button variant="outline" disabled>
              View Market (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
