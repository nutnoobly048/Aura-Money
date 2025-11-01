import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { APIContext } from "./APIProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { userData, fetchUser } = useContext(APIContext);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupEditImgOpen, setPopupEditImgOpen] = useState(false);
  const [isPopupEditPasswordOpen, setPopupEditPasswordOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    username: userData?.username,
    password: userData?.password,
    birthday: userData?.birthday,
    gender: userData?.gender,
    email: userData?.email,
    profile_img: userData?.profile_img,
    old_password: userData?.old_password,
    new_password: userData?.new_password,
  });
  const [editSelect, setEditSelect] = useState(null);
  const [valueInput, setValueInput] = useState("");

  const handleSubmitPassword = (old_pwd, new_pwd) => {
    const update = { ...editedData, ["old_password"]: old_pwd, ["new_password"]: new_pwd };
    setEditedData(update);
    pushData(update);
  };

  const handleSubmit = (input, name) => {
    const update = { ...editedData, [name]: input };
    setEditedData(update);
    pushData(update);
  };

  const pushData = async (update) => {
    try {
      await axios.post("http://localhost:5000/update_profile", update);
      await fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditedData({
      username: userData?.username,
      old_password: userData?.old_password,
      new_password: userData?.new_password,
      birthday: userData?.birthday,
      gender: userData?.gender,
      email: userData?.email,
      profile_img: userData?.profile_img,
    });
  }, [userData]);

  useEffect(() => {
    // console.log(editedData);
  }, [editedData]);

  const elements = [
    { name: "username", fetch: userData?.username, type: "text" },
    { name: "birthday", fetch: userData?.birthday, type: "date" },
    { name: "gender", fetch: userData?.gender, type: "text" },
    { name: "email", fetch: userData?.email, type: "email" },
  ];

  return (
    <div
      className={`flex flex-col p-4`}
    >
      <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">
        Profile info
      </h1>
      <div className="flex flex-col p-1 divide-y divide-zinc-300 border-zinc-200 border rounded-2xl">
        <p className="py-3 pl-1.5 flex justify-between items-center">
          Profile Picture :{" "}
          <img
            onClick={() => setPopupEditImgOpen(true)}
            src={userData?.profile_img}
            className="w-14 rounded-full ring-2 ring-offset-2 ring-zinc-300 mr-3 "
          />
        </p>

        {elements.map((item) => (
          <p
            key={item.name}
            className="py-3 pl-1.5 pr-7 flex justify-between items-center"
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)} :{" "}
            {item.fetch}
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                setPopupOpen(true);
                setEditSelect([item.name, item.type]);
              }}
            />
          </p>
        ))}

        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Change Password
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              setPopupEditPasswordOpen(true);
            }}
          />
        </p>
      </div>

      {isPopupEditPasswordOpen && (
        <div>
          <PopupEditPw
            setPopupEditPasswordOpen={setPopupEditPasswordOpen}
            handleSubmitPassword={handleSubmitPassword}
          />
          <Bgdark setPopupOpen={setPopupEditPasswordOpen} />
        </div>
      )}

      {isPopupEditImgOpen && (
        <div>
          <PopupEditImg
            setPopupEditImgOpen={setPopupEditImgOpen}
            valueInput={valueInput}
            setValueInput={setValueInput}
            handleSubmit={handleSubmit}
          />
          <Bgdark setPopupOpen={setPopupEditImgOpen} />
        </div>
      )}

      {isPopupOpen && (
        <div>
          <EditPopup
            setPopupOpen={setPopupOpen}
            editSelect={editSelect}
            handleSubmit={handleSubmit}
            valueInput={valueInput}
            setValueInput={setValueInput}
          />
          <Bgdark setPopupOpen={setPopupOpen} />
        </div>
      )}
    </div>
  );
}

const EditPopup = ({
  defValue,
  setPopupOpen,
  editSelect,
  handleSubmit,
  valueInput,
  setValueInput,
}) => {

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(valueInput, editSelect[0]);
      setPopupOpen(false);
    }
  }

  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">Edit {editSelect[0]}</p>
      <input
        defaultValue={defValue}
        placeholder={`Enter New ${editSelect[0]}`}
        type={editSelect[1]}
        onChange={(e) => setValueInput(e.target.value)}
        onKeyDown={handleEnter}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleSubmit(valueInput, editSelect[0]);
            setPopupOpen(false);
          }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

const Bgdark = ({ setPopupOpen }) => {
  return (
    <div
      className="fixed bg-black/50 inset-0 z-0"
      onClick={() => setPopupOpen(false)}
    ></div>
  );
};

const PopupEditImg = ({
  setValueInput,
  valueInput,
  handleSubmit,
  setPopupEditImgOpen,
}) => {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(valueInput, "profile_img");
      setPopupEditImgOpen(false);
    }
  }
  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">New Profile Pic</p>
      <input
        placeholder={`Enter New your new profile url`}
        type="text"
        onChange={(e) => setValueInput(e.target.value)}
        onKeyDown={handleEnter}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupEditImgOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleSubmit(valueInput, "profile_img");
            setPopupEditImgOpen(false);
          }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

const PopupEditPw = ({ setPopupEditPasswordOpen, handleSubmitPassword }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmitPassword(oldPass, newPass);
      setPopupEditPasswordOpen(false);
    }
  }
  return (
    <div className="w-3/4 sm:w-1/3! fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-zinc-200 bg-white rounded-xl shadow-xl p-2 gap-2 z-10">
      <p className="text-xl">Change Password</p>
      <input
        placeholder="Enter your old password"
        type="text"
        onChange={(e) => setOldPass(e.target.value)}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <input
        placeholder="Enter your new password"
        type="text"
        onChange={(e) => setNewPass(e.target.value)}
        onKeyDown={handleEnter}
        className="w-full border border-ui-green1 focus:outline-none pl-1 rounded-lg"
      />
      <div className="w-full flex items-center gap-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopupEditPasswordOpen(false)}
          className="w-1/2 border border-zinc-200 rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleSubmitPassword(oldPass, newPass);
            setPopupEditPasswordOpen(false);
          }}
          className="w-1/2 bg-ui-green1 text-white rounded-lg"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};
