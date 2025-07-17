export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">🌱 My Blog</h1>
        <div>
          <a href="/" className="mr-4">
            Home
          </a>
          <a href="/write" className="mr-4">
            Write
          </a>
          <a href="/login">Login</a>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className="bg-white text-center p-4 text-sm text-gray-500">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </div>
  );
}
