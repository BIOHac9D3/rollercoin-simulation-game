'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            RollerCoin Simulation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience Bitcoin mining simulation with mini-games, virtual rigs, and expandable architecture for future real cryptocurrency integration.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <img
            src="https://placehold.co/1920x1080?text=Modern+minimalist+landing+page+for+rollercoin+simulation"
            alt="Modern minimalist landing page for rollercoin simulation with clean typography and spacious layout"
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/mining">Start Mining</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/games">Play Games</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore all the features of our Bitcoin mining simulation platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Mining</CardTitle>
              <CardDescription>
                Simulate Bitcoin mining with realistic power calculations and earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experience the thrill of mining without real hardware costs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mini-Games</CardTitle>
              <CardDescription>
                Play engaging games to boost your mining power and earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Earn bonus mining power through skill-based challenges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rig Management</CardTitle>
              <CardDescription>
                Buy, upgrade, and manage your virtual mining rigs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build your mining empire with strategic investments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future Ready</CardTitle>
              <CardDescription>
                Expandable architecture for real cryptocurrency integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with future real crypto integration in mind
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-muted/50 rounded-lg">
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jump into the world of Bitcoin mining simulation in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Start Mining</h3>
              <p className="text-muted-foreground">
                Begin with basic mining power and start earning virtual Bitcoin
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Play Games</h3>
              <p className="text-muted-foreground">
                Boost your mining power by playing mini-games and earning rewards
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Expand</h3>
              <p className="text-muted-foreground">
                Invest in better rigs and grow your mining operation
              </p>
            </div>
          </div>

          <Button asChild size="lg">
            <Link href="/mining">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
