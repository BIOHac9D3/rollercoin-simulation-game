'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGame } from '@/context/GameContext'

// Available rigs for purchase
const availableRigs = [
  {
    name: 'Antminer S19',
    level: 1,
    efficiency: 5.2,
    cost: 150,
    earnings: 0.001,
    description: 'Entry-level mining rig with decent efficiency'
  },
  {
    name: 'Antminer S19 Pro',
    level: 1,
    efficiency: 8.5,
    cost: 280,
    earnings: 0.0018,
    description: 'Professional mining rig with high performance'
  },
  {
    name: 'WhatsMiner M30S',
    level: 1,
    efficiency: 12.3,
    cost: 450,
    earnings: 0.0025,
    description: 'Industrial-grade mining rig for serious miners'
  },
  {
    name: 'Avalon A1246',
    level: 1,
    efficiency: 15.8,
    cost: 680,
    earnings: 0.0035,
    description: 'High-end mining rig with maximum efficiency'
  }
]

export default function RigsPage() {
  const { state, buyRig, upgradeRig, sellRig } = useGame()

  const handleBuyRig = (rig: typeof availableRigs[0]) => {
    if (state.virtualCurrency >= rig.cost) {
      buyRig(rig)
    }
  }

  const handleUpgradeRig = (rigId: string) => {
    const rig = state.rigs.find(r => r.id === rigId)
    if (rig && state.virtualCurrency >= rig.cost * 0.5) {
      upgradeRig(rigId)
    }
  }

  const handleSellRig = (rigId: string) => {
    if (window.confirm('Are you sure you want to sell this rig?')) {
      sellRig(rigId)
    }
  }

  const totalMiningPower = state.rigs.reduce((sum, rig) => sum + rig.efficiency, 0)
  const totalInvestment = state.rigs.reduce((sum, rig) => sum + rig.cost, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Mining Rigs</h1>
          <p className="text-muted-foreground">
            Manage your mining hardware and optimize your operation
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Rigs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{state.rigs.length}</div>
              <p className="text-xs text-muted-foreground">Active mining rigs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMiningPower.toFixed(1)} TH/s</div>
              <p className="text-xs text-muted-foreground">Combined hash rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvestment.toFixed(2)} BTC</div>
              <p className="text-xs text-muted-foreground">Total hardware cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {state.rigs.length > 0 ? (totalMiningPower / state.rigs.length).toFixed(1) : '0'} TH/s
              </div>
              <p className="text-xs text-muted-foreground">Per rig average</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Rigs */}
        <Card>
          <CardHeader>
            <CardTitle>Your Mining Rigs</CardTitle>
            <CardDescription>Manage your current mining hardware</CardDescription>
          </CardHeader>
          <CardContent>
            {state.rigs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You don't have any mining rigs yet. Purchase your first rig below!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.rigs.map((rig) => {
                  const upgradeCost = rig.cost * 0.5
                  const sellValue = rig.cost * 0.7
                  const canUpgrade = state.virtualCurrency >= upgradeCost
                  
                  return (
                    <Card key={rig.id} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{rig.name}</CardTitle>
                          <Badge variant="secondary">Level {rig.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Efficiency:</span>
                            <span className="font-medium">{rig.efficiency.toFixed(1)} TH/s</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Earnings:</span>
                            <span className="font-medium">{rig.earnings.toFixed(6)} BTC/day</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Value:</span>
                            <span className="font-medium">{rig.cost.toFixed(2)} BTC</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpgradeRig(rig.id)}
                            disabled={!canUpgrade}
                            className="flex-1"
                          >
                            Upgrade ({upgradeCost.toFixed(2)} BTC)
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSellRig(rig.id)}
                            className="flex-1"
                          >
                            Sell ({sellValue.toFixed(2)} BTC)
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Rigs */}
        <Card>
          <CardHeader>
            <CardTitle>Available Mining Rigs</CardTitle>
            <CardDescription>Purchase new mining hardware to increase your hash rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableRigs.map((rig, index) => {
                const canAfford = state.virtualCurrency >= rig.cost
                
                return (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{rig.name}</CardTitle>
                      <CardDescription className="text-xs">{rig.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Power:</span>
                          <span className="font-medium">{rig.efficiency} TH/s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Daily Earnings:</span>
                          <span className="font-medium">{rig.earnings.toFixed(6)} BTC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-medium">{rig.cost} BTC</span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => handleBuyRig(rig)}
                        disabled={!canAfford}
                        className="w-full"
                      >
                        {canAfford ? 'Buy Now' : 'Insufficient Funds'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
