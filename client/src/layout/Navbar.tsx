import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-red-400 text-white">
      <div className="container mx-auto flex items-center font-medium tracking-wider">
        <ul className="flex flex-1 py-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="px-6">
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul className="w-64 flex justify-end">
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
