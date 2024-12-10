"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, ShoppingCart, X, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  //SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

type Quantity = '5kg' | '10kg' | '100kg'

interface SeedProduct {
  id: number
  name: string
  scientificName: string
  description: string
  prices: Record<Quantity, number>
  image: string
}

interface CartItem extends SeedProduct {
  quantity: number
  selectedSize: Quantity
}

const seeds: SeedProduct[] = [
  {
    id: 1,
    name: "Red Grass",
    scientificName: "Bothriochloa macra",
    description: "A warm-season perennial grass native to Australia, known for its drought tolerance and red-tinged foliage.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/red-grass.jpeg"
  },
  {
    id: 2,
    name: "Green Summer Grass",
    scientificName: "Brachiaria miliiformis",
    description: "A robust, fast-growing summer grass that provides excellent ground cover and erosion control.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/green-summer-grass.jpeg"
  },
  {
    id: 3,
    name: "Cotton Panic",
    scientificName: "Themeda triandra",
    description: "A hardy, drought-resistant grass that's an important food source for native wildlife.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/cotton-panic.jpeg"
  },
  {
    id: 4,
    name: "Warrego Summer Grass",
    scientificName: "Paspalidium Distans",
    description: "Grow on a varying range of soils and over a wide geographical area",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/green-summer-grass.jpeg"
  }
]

export default function MarketplacePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()

  const addToCart = (seed: SeedProduct, quantity: number, size: Quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === seed.id && item.selectedSize === size);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === seed.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...seed, quantity, selectedSize: size }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, size: Quantity) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.selectedSize === size)))
  }

  const updateQuantity = (id: number, size: Quantity, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.prices[item.selectedSize] * item.quantity, 0)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/courses">
              Courses
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/marketplace">
              Marketplace
            </Link>
          </div>
          <MobileNav />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground mb-4">
              Australian Native Grass Seed Marketplace
            </h1>
            <p className="text-muted-foreground md:text-xl mb-8 mt-2">
              Discover a variety of high-quality Australian native grass seeds for your regenerative farming projects.
            </p>
{/*             
            <Card className="bg-background border-border mb-8">
              <CardHeader>
                <CardTitle className="text-foreground">
                  The Importance of Restoring Native Grasslands
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <p className="text-muted-foreground mb-4">
                    Restoring native grasslands is crucial for maintaining biodiversity, improving soil health, and supporting sustainable agriculture. Native grasses have evolved to thrive in local conditions, making them more resilient and requiring fewer inputs than introduced species.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    By planting native grasses, you're not just improving your land - you're contributing to the preservation of Australia's unique ecosystems. These grasses provide essential habitats for native wildlife, enhance soil structure, increase carbon sequestration, and offer natural erosion control.
                  </p>
                  <p className="text-muted-foreground">
                    Whether you're a farmer looking to implement sustainable practices, a conservationist working on habitat restoration, or a homeowner wanting to create a low-maintenance, eco-friendly landscape, our selection of native grass seeds can help you make a positive impact on the environment.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src="/images/grassland.webp"
                    alt="Native Australian Grassland"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </CardContent>
            </Card> */}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {seeds.map((seed) => (
                <Card key={seed.id} className="flex flex-col justify-between bg-background border-border">
                  <CardHeader>
                    <Image
                      src={seed.image}
                      alt={seed.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <CardTitle className="text-foreground">{seed.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic mb-2">{seed.scientificName}</p>
                    <p className="text-sm text-muted-foreground">{seed.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2">
                    {(() => {
                      const [selectedSize, setSelectedSize] = useState<Quantity>('5kg');
                      const [quantity, setQuantity] = useState(1);

                      return (
                        <>
                          <div className="w-full">
                            <Select
                              onValueChange={(value: Quantity) => {
                                setSelectedSize(value);
                                setQuantity(1);
                              }}
                            >
                              <SelectTrigger id={`size-${seed.id}`} className="w-full">
                                <SelectValue placeholder="Select quantity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5kg">5kg - ${seed.prices['5kg']}</SelectItem>
                                <SelectItem value="10kg">10kg - ${seed.prices['10kg']}</SelectItem>
                                <SelectItem value="100kg">100kg - ${seed.prices['100kg']}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex w-full justify-between items-center">
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, Math.min(selectedSize === '100kg' ? 10 : 20, parseInt(e.target.value) || 1)))}
                              className="w-20"
                            />
                            <Button 
                              className="bg-accent hover:bg-accent/90 text-accent-foreground"
                              onClick={() => {
                                if (selectedSize && quantity > 0) {
                                  addToCart(seed, quantity, selectedSize);
                                }
                              }}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen} side="right">
          <SheetContent className="w-[350px] sm:w-[450px]">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <p className="text-center mt-4">Your cart is empty</p>
            ) : (
              <div className="mt-8 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between border-b pb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.selectedSize}</p>
                      <p className="text-sm font-medium">${item.prices[item.selectedSize] * item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <p className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</p>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => router.push(`/checkout?total=${totalPrice.toFixed(2)}`)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg z-50"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </main>
      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs">© 2024 Smartsoil. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

