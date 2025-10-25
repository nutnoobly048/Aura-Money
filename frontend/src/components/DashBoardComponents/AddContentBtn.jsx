import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddContentBtn = ({ isPopupOpen, setPopupOpen, setDarkBgPopupOpen, isDarkBgPopupOpen }) => {
  return (
    <button
      onClick={() => {
        setPopupOpen(!isPopupOpen);
        setDarkBgPopupOpen(!isDarkBgPopupOpen);
      }}
    >
      <FontAwesomeIcon
        icon={faPlus}
        size="md"
        className={`fixed bottom-0 right-0 text-white px-3 py-3.5 m-5 
        rounded-full duration-200 ${
          isPopupOpen ? "z-30 rotate-405 bg-rose-500" : "bg-ui-green2"
        }`}
      />
    </button>
  );
};

export default AddContentBtn;
