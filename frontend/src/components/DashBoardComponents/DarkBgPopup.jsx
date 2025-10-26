const DarkBgPopup = ({setPopupOpen, isPopupOpen}) => {
  return (
    <div
      onClick={() => setPopupOpen(false)}
      className={`fixed inset-0 bg-black z-10 transition-all ease-in-out duration-200 
      ${isPopupOpen ? "block opacity-50" : "invisible opacity-0 pointer-events-none"}`}
    />
  );
};


export default DarkBgPopup;