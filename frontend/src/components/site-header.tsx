import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { ConnectButton } from "@/components/connect-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/100 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container mx-auto px-2 flex h-14 max-w-7xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center  space-x-2 justify-end">
          <nav className="flex items-center">
            <ConnectButton />
            <div className="ml-2">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
