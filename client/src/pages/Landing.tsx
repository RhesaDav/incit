import React from 'react'
import { Button } from '../components/Button'

export default function Landing() {
  return (
    <div className="bg-base-50 min-h-screen flex flex-col">
      <header className="p-4 bg-base-100">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">YourApp</h1>
          <div>
            <Button variant="secondary" className="mr-2">Login</Button>
            <Button variant="primary">Register</Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary mb-4">Welcome to YourApp</h2>
          <p className="text-xl text-accent mb-8">The best solution for your needs</p>
          <Button variant="primary">Get Started</Button>
        </div>
      </main>
      <footer className="bg-base-100 p-4 text-center text-gray-400">
        © 2024 YourApp. All rights reserved.
      </footer>
    </div>
  )
}