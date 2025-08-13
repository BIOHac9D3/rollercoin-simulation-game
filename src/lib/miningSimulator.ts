export interface MiningStats {
  hashRate: number
  difficulty: number
  blockReward: number
  estimatedEarnings: number
}

export class MiningSimulator {
  private intervalId: NodeJS.Timeout | null = null
  private isRunning = false

  constructor(
    private onEarningsUpdate: (earnings: number) => void,
    private onStatsUpdate: (stats: MiningStats) => void
  ) {}

  start(miningPower: number): void {
    if (this.isRunning) {
      this.stop()
    }

    this.isRunning = true
    
    // Simulate mining every 5 seconds
    this.intervalId = setInterval(() => {
      try {
        const stats = this.calculateMiningStats(miningPower)
        const earnings = this.calculateEarnings(miningPower)
        
        this.onEarningsUpdate(earnings)
        this.onStatsUpdate(stats)
      } catch (error) {
        console.error('Mining simulation error:', error)
        this.stop()
      }
    }, 5000)
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isRunning = false
  }

  isActive(): boolean {
    return this.isRunning
  }

  private calculateMiningStats(miningPower: number): MiningStats {
    // Simulate realistic Bitcoin mining stats
    const baseHashRate = miningPower * 1e12 // Convert TH/s to H/s
    const difficulty = 50000000000000 // Simulated difficulty
    const blockReward = 6.25 // Current Bitcoin block reward
    
    // Estimate earnings per hour based on mining power
    const networkHashRate = 400e18 // Approximate Bitcoin network hash rate
    const blocksPerHour = 6 // Bitcoin blocks per hour on average
    const estimatedEarnings = (baseHashRate / networkHashRate) * blockReward * blocksPerHour

    return {
      hashRate: baseHashRate,
      difficulty,
      blockReward,
      estimatedEarnings
    }
  }

  private calculateEarnings(miningPower: number): number {
    // Base earnings calculation
    const baseEarning = miningPower * 0.001 // 0.001 BTC per TH/s per interval
    
    // Add some randomness to make it more realistic
    const randomMultiplier = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
    
    return baseEarning * randomMultiplier
  }

  // Utility method to format hash rate
  static formatHashRate(hashRate: number): string {
    if (hashRate >= 1e18) {
      return `${(hashRate / 1e18).toFixed(2)} EH/s`
    } else if (hashRate >= 1e15) {
      return `${(hashRate / 1e15).toFixed(2)} PH/s`
    } else if (hashRate >= 1e12) {
      return `${(hashRate / 1e12).toFixed(2)} TH/s`
    } else if (hashRate >= 1e9) {
      return `${(hashRate / 1e9).toFixed(2)} GH/s`
    } else if (hashRate >= 1e6) {
      return `${(hashRate / 1e6).toFixed(2)} MH/s`
    } else {
      return `${hashRate.toFixed(2)} H/s`
    }
  }

  // Utility method to calculate profitability
  static calculateProfitability(miningPower: number, electricityCost: number = 0.1): {
    dailyEarnings: number
    dailyCosts: number
    dailyProfit: number
  } {
    const dailyEarnings = miningPower * 0.001 * 24 * 12 // 12 intervals per hour
    const powerConsumption = miningPower * 100 // Assume 100W per TH/s
    const dailyCosts = (powerConsumption / 1000) * 24 * electricityCost // kWh * cost per kWh
    
    return {
      dailyEarnings,
      dailyCosts,
      dailyProfit: dailyEarnings - dailyCosts
    }
  }
}

// Utility functions for mining calculations
export function calculateOptimalRigConfiguration(budget: number, availableRigs: any[]): any[] {
  // Simple greedy algorithm to find optimal rig combination
  const sortedRigs = availableRigs.sort((a, b) => (b.efficiency / b.cost) - (a.efficiency / a.cost))
  const selectedRigs = []
  let remainingBudget = budget

  for (const rig of sortedRigs) {
    while (remainingBudget >= rig.cost) {
      selectedRigs.push(rig)
      remainingBudget -= rig.cost
    }
  }

  return selectedRigs
}

export function estimateBreakEvenTime(rigCost: number, dailyProfit: number): number {
  if (dailyProfit <= 0) return Infinity
  return rigCost / dailyProfit // Days to break even
}
