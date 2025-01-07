import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Shield className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold">Malicious URL Detector</h1>
      </div>
    </header>
  );
}
