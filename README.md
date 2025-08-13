# RollerCoin Simulation

A Bitcoin mining simulation game built with Next.js 15+, TypeScript, and modern web technologies. Experience the thrill of cryptocurrency mining through mini-games, virtual mining rigs, and realistic mining simulations - all without real financial risk.

## 🎮 Features

### Core Gameplay
- **Virtual Bitcoin Mining**: Realistic mining simulation with hash rate calculations
- **Mining Rig Management**: Buy, upgrade, and sell virtual mining hardware
- **Mini-Games**: Play the Hash Rate Clicker game to boost your mining power
- **Real-time Dashboard**: Monitor your mining operation with live statistics
- **Persistent Progress**: Game state saved locally between sessions

### Technical Features
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Robust error boundaries and fallback mechanisms
- **Future-Ready**: Expandable architecture for real cryptocurrency integration
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
> Runs on http://localhost:3000 with Turbopack for fast development

### Production Build
```bash
npm run build && npm start
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Landing page
│   ├── mining/            # Mining dashboard
│   ├── rigs/              # Rig management
│   └── games/             # Mini-games
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── ErrorBoundary.tsx  # Error handling
│   ├── Navigation.tsx     # App navigation
│   └── Footer.tsx         # App footer
├── context/               # React context
│   └── GameContext.tsx    # Game state management
└── lib/                   # Utility libraries
    ├── miningSimulator.ts # Mining logic
    ├── cryptoService.ts   # Future crypto integration
    └── utils.ts           # Utility functions
```

## 🎯 How to Play

1. **Start Mining**: Visit the Mining dashboard to begin your virtual mining operation
2. **Buy Rigs**: Purchase mining hardware in the Rigs section to increase your hash rate
3. **Play Games**: Boost your mining power by playing mini-games
4. **Manage Portfolio**: Upgrade or sell rigs to optimize your mining efficiency
5. **Track Progress**: Monitor your earnings and performance in real-time

## 🔧 Game Mechanics

### Mining Simulation
- Base mining power starts at 10 TH/s
- Earnings calculated based on realistic Bitcoin mining formulas
- Mining power affects your virtual Bitcoin generation rate

### Rig System
- Multiple rig types with different efficiency and cost ratios
- Upgrade rigs to increase their performance (costs 50% of original price)
- Sell rigs for 70% of their current value

### Mini-Games
- **Hash Rate Clicker**: Click rapidly to earn mining power bonuses
- Earn 0.1 TH/s for every 10 points scored
- Earn 0.001 BTC bonus for every 20 points scored

## 🔮 Future Enhancements

The application is designed with expansion in mind:

### Planned Features
- Real cryptocurrency integration via API services
- Additional mini-games (Memory Match, Hash Puzzle, Market Trader)
- Multiplayer competitions and leaderboards
- Advanced rig customization and overclocking
- Market trading simulation

### Integration Points
- `src/lib/cryptoService.ts` contains stubs for real crypto APIs
- Modular architecture allows easy addition of new games
- Context system supports complex state management

## 🛠️ Technical Stack

### Core Technologies
- **Next.js 15+**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library

### Key Dependencies
- **@radix-ui/***: Accessible UI primitives
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional styling utilities

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Fast development builds

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1024px+)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## 🔒 Data Persistence

Game state is automatically saved to browser localStorage, including:
- Virtual currency balance
- Mining power and total earnings
- Owned mining rigs and their levels
- Game history and achievements

## 🤝 Contributing

This is a simulation project designed for educational and entertainment purposes. The codebase demonstrates modern React patterns and can serve as a learning resource for:
- Next.js app router implementation
- TypeScript in React applications
- State management with Context API
- Component composition with shadcn/ui
- Responsive design with Tailwind CSS

## ⚠️ Disclaimer

This is a **simulation application only**. No real cryptocurrency is involved, and no real financial transactions occur. All Bitcoin values and mining calculations are virtual and for entertainment purposes only.

## 📄 License

This project is for educational and demonstration purposes.
