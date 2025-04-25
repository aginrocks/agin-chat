import { Button } from "@/components/ui/button";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col items-center justify-center min-h-svh">
                <Button>Click me</Button>
            </div>
        </ThemeProvider>
    )
}