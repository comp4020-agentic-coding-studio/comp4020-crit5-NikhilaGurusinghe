export default function Navbar() {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between px-8 pt-9 md:px-9 md:pt-10">
        <h1 className="sr-only">Daily Mode</h1>
        <p className="text-5xl font-bold">0<span className="text-xl ml-[5.5px] md:ml-1.5">in a row</span></p>

        <ul className="flex flex-row gap-4">
          <li>Daily</li>
          <li>Reset</li>
        </ul>
      </nav>
    </header>
  );
}