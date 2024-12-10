"use client"

import { useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", { email, password })
    // Here you would typically authenticate the user
    // For demo purposes, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-accent text-foreground" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-accent text-foreground" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-accent text-foreground" href="/courses">
            Courses
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back to Smartsoil</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-input"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-muted-foreground">Remember me</Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSubmit}>Log in</Button>
            <div className="text-sm text-center space-y-2">
              <Link href="/forgot-password" className="text-accent hover:underline block">
                Forgot your password?
              </Link>
              <span className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-accent hover:underline">
                  Sign up
                </Link>
              </span>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs text-muted-foreground">© 2024 Smartsoil. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

