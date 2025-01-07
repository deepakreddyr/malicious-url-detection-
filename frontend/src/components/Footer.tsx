export function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-600">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Malicious URL Detector. All rights
          reserved.
        </p>
        <p className="mt-2 text-sm">
          Disclaimer: This is a demo application. For real-world use, implement
          a robust URL checking algorithm or use a reliable API.
        </p>
      </div>
    </footer>
  );
}
