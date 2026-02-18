import Header from './components/Header'
import BriefDisplay from './components/BriefDisplay'
import BotpressChat from './components/BotpressChat'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 pt-16">
        <div className="grid w-full grid-cols-[60%_40%]">
          {/* Left Side (60%) - Botpress Chat */}
          <BotpressChat />
    {/* test */}
          {/* Right Side (40%) - Technical Brief */}
          <BriefDisplay />
        </div>
      </main>
    </div>
  )
}

