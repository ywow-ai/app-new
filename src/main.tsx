import "@/assets/main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed velit
        molestiae eveniet neque possimus vel placeat consectetur nihil repellat
        atque doloribus, deleniti earum natus dolores quis pariatur vitae.
        Itaque, iste?
      </p>
      <ModeToggle />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
