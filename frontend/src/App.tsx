import React, { useState } from "react";
import { URLChecker } from "./components/URLChecker";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  const [result, setResult] = useState<{ isMalicious: boolean } | null>(null);

  const checkURL = (url: string) => {
    // Simulate URL checking (replace with actual API call in a real application)
    const isMalicious = Math.random() < 0.5;
    setResult({ isMalicious });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <URLChecker onCheck={checkURL} result={result} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
