import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
  {
    name: "Home", href: "#hero"
  },
  {
    name: "About", href: "#about"
  },
  {
    name: "Skills", href: "#skills"
  },
  {
    name: "Project", href: "#projects"
  },
  {
    name: "Contact", href: "#contact"
  },
]

export const Navbar = () => {

  const [isScrolled, setisScrolled] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(true);

  useEffect (() =>  {
    const handleScroll = () => {
      setisScrolled(window.screenY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []
)


  return <nav className={cn(
    "fixed w-full z-40 transition-all duration-300",
     isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
  )

  }>
    <div className= "container flex items-center justify-between">
      <a className="text-xl font-bold text-primary flex items-center"
         href="#hero">
        <span className="relative z-10">
          <span className="text-glow text-foreground">
              PierrePrudh
          </span>{" "}
          Portfolio
        </span>
      </a>

      {/*Desktop version*/}

      <div className="hidden md:flex space-x-8">
        {navItems.map((item, key) => (
          <a key = {key} href={item.href} className="text-foreground/80 hover:text-primary transition-colors duration-300">
            {item.name}
          </a>
        ))}
      </div>

      {/*Mobile version*/}

      <button onClick={() => setisMenuOpen((prev) => !prev )}
              className="md:hidden p-2 text-foreground  z-50"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        > {
        isMenuOpen ? <X size={24} /> : <Menu size={24}/> }
      </button>

      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center h-screen",
        "transition-all duration-300 md:hidden",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <a className="text-3xl font-bold text-primary flex items-center mb-8"
           href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">
                PierrePrudh
            </span>{" "}
            Portfolio
          </span>
        </a>
        <div className="w-30 h-px bg-foreground/30 mb-8 transition-all duration-500 sm:w-48 md:w-60"></div>

          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a key = {key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              onClick={() => setisMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
      </div>
    </div>
  </nav>

}
