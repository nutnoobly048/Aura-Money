import { useState } from "react";
import AccountBoard from "./DashBoardComponents/accountboard";
import AccountSetting from "./DashBoardComponents/AccountSetting";
import Profile from "./Profile";
import AddContentPopup from "./DashBoardComponents/AddContentPopup";
import AddContentBtn from "./DashBoardComponents/AddContentBtn";
import Navbar from "./Navbar/Navbar";
import DesktopProfileIcon from "./DashBoardComponents/DesktopProfileIcon";
import ProfileContextMenu from "./Navbar/ProfileContextMenu";
import DarkBgPopup from "./DashBoardComponents/DarkBgPopup";

export default function dashboard() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [addContentType, setAddContentType] = useState("Expense");
  const [isProfileContextMenuOpen, setProfileContextMenuOpen] = useState(false);
  const [pageOpen, setPageOpen] = useState("account");
  const [isDarkBgPopupOpen, setDarkBgPopupOpen] = useState(false);

  return (
    <div className="w-screen h-dvh flex flex-col bg-gradient-to-b from-[#62b79c] to-[#afd1a1] p-3 sm:flex-row!">
      <Navbar
        setPageOpen={setPageOpen}
        isProfileContextMenuOpen={isProfileContextMenuOpen}
        setProfileContextMenuOpen={setProfileContextMenuOpen}
      />

      <div className="relative bg-white flex-1 flex flex-col rounded-2xl overflow-y-auto">
        <DesktopProfileIcon setPageOpen={setPageOpen} />
        <img src="aurora.png" className=" max-h-[60px] w-full pt-10 sm:pt-0" />
        <AccountBoard pageOpen={pageOpen} />
        <Profile pageOpen={pageOpen} />
        <AccountSetting pageOpen={pageOpen} />
      </div>

      <DarkBgPopup
        isDarkBgPopupOpen={isDarkBgPopupOpen}
        setDarkBgPopupOpen={setDarkBgPopupOpen}
        setPopupOpen={setPopupOpen}
        setProfileContextMenuOpen={setProfileContextMenuOpen}
      />
      <AddContentBtn isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} isDarkBgPopupOpen={isDarkBgPopupOpen} setDarkBgPopupOpen={setDarkBgPopupOpen}/>
      <AddContentPopup
        isPopupOpen={isPopupOpen}
        addContentType={addContentType}
        setAddContentType={setAddContentType}
      />
      <ProfileContextMenu
        isProfileContextMenuOpen={isProfileContextMenuOpen}
        setProfileContextMenuOpen={setProfileContextMenuOpen}
        setPageOpen={setPageOpen}
      />
    </div>
  );
}
