import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";

interface URLCheckerProps {
  onCheck: (url: string) => void;
  result: { isMalicious: boolean } | null;
}

export function URLChecker({ onCheck, result }: URLCheckerProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheck(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Check URL Safety</CardTitle>
        <CardDescription>
          Enter a URL to check if it's malicious or safe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit">Check</Button>
        </form>
      </CardContent>
      {result && (
        <CardFooter>
          <div
            className={`flex items-center gap-2 ${
              result.isMalicious ? "text-red-500" : "text-green-500"
            }`}
          >
            {result.isMalicious ? (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>Malicious URL detected! Be cautious.</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>URL appears to be safe.</span>
              </>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
