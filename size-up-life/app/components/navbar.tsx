export default function Navbar() {
  return (
    <header>
      <nav className="flex flex-row items-baseline justify-between">
        <h1 className="sr-only">Daily Mode</h1>
        <p>0 <span>in a row</span></p>

        <ul className="flex flex-row">
          <li>Daily</li>
          <li>Reset</li>
        </ul>
      </nav>
    </header>
  );
}