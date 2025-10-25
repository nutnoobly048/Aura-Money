import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileContextMenu = ({
  isProfileContextMenuOpen,
  setProfileContextMenuOpen,
  setPageOpen,
}) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 duration-200 ease-in-out flex flex-col gap-y-5
     ${isProfileContextMenuOpen ? "block scale-100" : "invisible scale-0"}`}
    >
      <ProfileBtn
        setPageOpen={setPageOpen}
        setProfileContextMenuOpen={setProfileContextMenuOpen}
      />
      <LogoutBtn />
    </div>
  );
};
export default ProfileContextMenu;

const ProfileBtn = ({ setPageOpen, setProfileContextMenuOpen }) => {
  return (
    <button
      className="z-30 px-8 py-1 font-bold text-xl rounded-2xl bg-transparent text-white border border-white"
      onClick={() => {
        setPageOpen("profile");
        setProfileContextMenuOpen(false);
      }}
    >
      Profile
    </button>
  );
};

const LogoutBtn = () => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const data = await axios.get("http://localhost:5000/logout");
      navigate("/login_register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="z-30 px-8 py-1 font-bold text-xl rounded-2xl bg-white text-ui-green1"
      onClick={Logout}
    >
      Logout
    </button>
  );
};