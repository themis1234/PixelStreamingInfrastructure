// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PixelStreamingContainer from "./components/PixelStreamingContainer";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Optionally show a loading indicator while checking auth status.

  return <PixelStreamingContainer />;
}
