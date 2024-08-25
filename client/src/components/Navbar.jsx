import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineScan } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-[10dvh] bg-gray-800 flex justify-around items-center py-2">
      <Link to="/" className="text-white mx-2">
        <GrHomeRounded size={24} />
      </Link>
      <div className="my-4">
        <Link
          to="/scan"
          className="bg-white p-3 my-2 rounded-full h-16 w-16 flex items-center justify-center"
        >
          <span className="mx-2 text-black">
            <AiOutlineScan size={32} />
          </span>
        </Link>
      </div>
      <Link to="/chat" className="text-white mx-2">
        <IoChatbubbleOutline size={24} />
      </Link>
    </nav>
  );
};

export default Navbar;
