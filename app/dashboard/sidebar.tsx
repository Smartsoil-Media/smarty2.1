import Link from 'next/link'
import { Home, BookOpen, Sprout, Settings, LogOut, MessageSquare, Film } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface SidebarProps {
  className?: string
  activePage: string
  setActivePage: (page: string) => void
}

export function DashboardSidebar({ className, activePage, setActivePage }: SidebarProps) {
  return (
    <Sidebar className={`bg-background border-r border-border ${className}`}>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Smartsoil</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActivePage('home')} 
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'home' ? 'bg-secondary text-secondary-foreground' : ''}`}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActivePage('courses')} 
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'courses' ? 'bg-secondary text-secondary-foreground' : ''}`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>My Courses</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActivePage('resources')} 
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'resources' ? 'bg-secondary text-secondary-foreground' : ''}`}
            >
              <Sprout className="mr-2 h-4 w-4" />
              <span>Resources</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActivePage('feed')} 
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'feed' ? 'bg-secondary text-secondary-foreground' : ''}`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Farm Feed</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActivePage('media')} 
              className={`text-foreground hover:bg-secondary hover:text-secondary-foreground ${activePage === 'media' ? 'bg-secondary text-secondary-foreground' : ''}`}
            >
              <Film className="mr-2 h-4 w-4" />
              <span>Media</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-foreground hover:bg-secondary hover:text-secondary-foreground">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="text-foreground hover:bg-secondary hover:text-secondary-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  )
}

