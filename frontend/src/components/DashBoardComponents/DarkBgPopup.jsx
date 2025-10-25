const DarkBgPopup = ({
  setDarkBgPopupOpen,
  isDarkBgPopupOpen,
  setPopupOpen,
  setProfileContextMenuOpen,
}) => {
  return (
    <div
      onClick={() => {
        setDarkBgPopupOpen(false)
        setPopupOpen(false);
        setProfileContextMenuOpen(false);
      }}
      className={`fixed inset-0 bg-black z-10 transition-all
      ease-in-out duration-200 ${
        isDarkBgPopupOpen
          ? "block opacity-50"
          : "invisible opacity-0 pointer-events-none"
      }`}
    />
  );
};


export default DarkBgPopup;