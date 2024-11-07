import Link from "next/link";

const Header = () => {
    return (
      <header className="  bg-blue-700">
        <nav className="py-5  container mx-auto ">
          <ul className="flex space-x-4 text-white">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:underline" href="/about">About</Link></li>
            <li><Link className="hover:underline" href="/blog">Blog</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
  