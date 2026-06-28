import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted mb-8">Саҳифа ёфт нашуд</p>
      <Link href="/" className="btn-luxury px-6 py-3 rounded-xl">
        Ба саҳифаи асосӣ
      </Link>
    </div>
  );
}
