import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faPlus, faSackDollar, faChartSimple, faEllipsis, faCaretDown, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from './profile';
import AccountSetting from './AccountSetting';
import Accountboard from './accountboard';

function dashboard() {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [addContentType, setAddContentType] = useState('Expense');
  const [isProfileContextMenuOpen, setProfileContextMenuOpen] = useState(false);
  const [pageOpen, setPageOpen] = useState('account');

  return (
    <div className='w-screen h-dvh flex flex-col bg-gradient-to-b from-[#62b79c] to-[#afd1a1] p-3 sm:flex-row!'>
      <nav className='relative flex justify-between items-center mb-1 sm:pr-2 sm:flex-col sm:justify-center!'>
        <Hamburger />
        <img src='logo.svg' className='w-[12vh] sm:absolute sm:top-0 sm:left-1/2 sm:pr-2 sm:-translate-x-1/2' />
        <AccountSelectBtn setPageOpen={setPageOpen} />
        <button onClick={() => setPageOpen('account')} className='hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer'><FontAwesomeIcon size='xl' icon={faSackDollar} /><p className='text-xl'>Account</p></button>
        <button onClick={() => setPageOpen('Stats')} className='hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer'><FontAwesomeIcon size='xl' icon={faChartSimple} /><p className='text-xl'>Stats</p></button>
        <button onClick={() => setPageOpen('More')} className='hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer'><FontAwesomeIcon size='xl' icon={faEllipsis} /><p className='text-xl'>More</p></button>
        <User isProfileContextMenuOpen={isProfileContextMenuOpen} setProfileContextMenuOpen={setProfileContextMenuOpen}/>
      </nav>

      <div className='relative bg-white flex-1 flex flex-col rounded-2xl'>
        <DesktopProfileIcon setPageOpen={setPageOpen} />
        <img src='aurora.png' className=' max-h-[60px] w-full pt-10 sm:pt-0' />
        <Accountboard pageOpen={pageOpen}/>
        <Profile pageOpen={pageOpen}/>
        <AccountSetting pageOpen={pageOpen} />
      </div>


      <BgBlurPopup setPopupOpen={setPopupOpen} isPopupOpen={isPopupOpen} />
      <BgBlurProfileContextMenu isProfileContextMenuOpen={isProfileContextMenuOpen} setProfileContextMenuOpen={setProfileContextMenuOpen} />
      <AddContentBtn isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />
      <AddContentPopup isPopupOpen={isPopupOpen} addContentType={addContentType} setAddContentType={setAddContentType}/>
      <ProfileContextMenu isProfileContextMenuOpen={isProfileContextMenuOpen} setProfileContextMenuOpen={setProfileContextMenuOpen} setPageOpen={setPageOpen}/>
    </div>
  )
}

const AccountSelectBtn = ({setPageOpen}) => {
  return (
    <div onClick={() => setPageOpen("accountSetting")}
     className='hidden sm:flex! items-center text-white font-bold gap-x-1 border-2 border-white rounded-full px-2 py-1 cursor-pointer'>
      <p>AccountName #1</p>
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  );
}

const DesktopProfileIcon = ({ setPageOpen }) => {
  const [isDesktopProfileContextMenuOpen, setDesktopProfileContextMenu] = useState(false);
  return (
    <div className='hidden w-full justify-end items-center sm:flex!'>
      <button className='relative flex justify-between items-center border-2 border-zinc-400 rounded-3xl py-1 px-1 gap-x-5 m-2 cursor-pointer' 
       onClick={() => setDesktopProfileContextMenu(!isDesktopProfileContextMenuOpen)}>
        <div className='flex justify-center items-center gap-x-2 cursor-pointer'>
          <img src="Profile.jpg" className='w-[3vh] rounded-full'/>
          <label className='cursor-pointer'>yeaimningning</label>
        </div>
        <FontAwesomeIcon icon={faCaretDown} />
        <DPIContextMenu isDesktopProfileContextMenuOpen={isDesktopProfileContextMenuOpen} setPageOpen={setPageOpen}/>
      </button>
    </div>
  );
}

const DPIContextMenu = ({isDesktopProfileContextMenuOpen, setPageOpen}) => {
  return (
    <div className={`absolute w-full top-full left-1/2 -translate-x-1/2 flex flex-col justify-center border border-zinc-300 divide-y-2 divide-zinc-300/50
     rounded-xl m-1 duration-200 ease-in-out ${isDesktopProfileContextMenuOpen ? '-translate-y-0' : 'translate-y-[80dvh] invisible pointer-events-none'}`}>
      <p onClick={() => setPageOpen('profile')} className='p-1 bg-white hover:bg-zinc-300 rounded-t-xl'>Profile</p>
      <p className='p-1 bg-white hover:bg-zinc-300 rounded-b-xl'>Logout</p>
    </div>
  );
}

const BgBlurPopup = ({setPopupOpen, isPopupOpen}) => {
  return (
    <div onClick={() => setPopupOpen(false)} className={`fixed inset-0 bg-black z-10 transition-all
     ease-in-out duration-200 ${isPopupOpen ? 'block opacity-50' : 'invisible opacity-0'}`} />
  );
}

const BgBlurProfileContextMenu = ({isProfileContextMenuOpen, setProfileContextMenuOpen}) => {
  return (
    <div onClick={() => setProfileContextMenuOpen(!isProfileContextMenuOpen)} className={`fixed inset-0 bg-black z-10 transition-all
     ease-in-out duration-200 ${isProfileContextMenuOpen ? 'block opacity-50' : 'invisible opacity-0'}`} />
  );
}

const Hamburger = ({ size = '2xl' }) => {
  return (
    <FontAwesomeIcon size={size} icon={faBars} className='text-white sm:hidden!' />
  );
}

const User = ({ size = '2xl', isProfileContextMenuOpen, setProfileContextMenuOpen }) => {
  return (
    <FontAwesomeIcon size={size} icon={faUser} className='text-white cursor-pointer sm:hidden!' onClick={() => setProfileContextMenuOpen(!isProfileContextMenuOpen)}/>
  );
}

const ProfileContextMenu = ({isProfileContextMenuOpen, setProfileContextMenuOpen, setPageOpen}) => {
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 duration-200 ease-in-out flex flex-col gap-y-5
     ${isProfileContextMenuOpen ? 'block scale-100' : 'invisible scale-0'}`} >
      <ProfileBtn setPageOpen={setPageOpen} setProfileContextMenuOpen={setProfileContextMenuOpen} />
      <LogoutBtn />
    </div>
  );
}

const ProfileBtn = ({setPageOpen, setProfileContextMenuOpen}) => {
  return (
    <button className='z-30 px-8 py-1 font-bold text-xl rounded-2xl bg-transparent text-white border border-white'
     onClick={() => {setPageOpen('profile');setProfileContextMenuOpen(false)}}>Profile</button>
  );
}

const LogoutBtn = () => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const data = await axios.get('http://localhost:5000/logout')
      navigate('/login_register');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className='z-30 px-8 py-1 font-bold text-xl rounded-2xl bg-white text-ui-green1' onClick={Logout}>Logout</button>
  );
}

const AddContentBtn = ({ isPopupOpen, setPopupOpen }) => {
  return (
    <button onClick={() => setPopupOpen(!isPopupOpen)}>
      <FontAwesomeIcon icon={faPlus} size="md" className={`fixed bottom-0 right-0 text-white px-3 py-3.5 m-5 
        rounded-full duration-200 ${isPopupOpen ? 'z-30 rotate-405 bg-rose-500' : 'bg-ui-green2'}`} />
    </button>
  );
}

const AddContentPopup = ({ isPopupOpen, addContentType, setAddContentType }) => {

  const typeSelectColor = {
    'Income': 'left-0! text-black',
    'Expense': 'left-1/3! text-black',
    'Transfer': 'left-2/3! text-black'
  }

  return (
    <div className={`top-1/2 left-1/2 absolute w-[calc(100%-24px)] -translate-y-1/2 -translate-x-1/2 bg-white 
    rounded-2xl z-20 ease-in-out duration-200 max-w-2xl ${isPopupOpen ? 'block scale-100' : 'invisible scale-0'}`}>
      
      <nav className='relative rounded-t-2xl bg-gradient-to-r from-[#62b79c] to-[#afd1a1]'>
        <div className={`absolute top-0 left-1/3 ${typeSelectColor[addContentType]} bg-white w-1/3 h-[calc(100%+1px)] rounded-t-2xl duration-250 overflow-hidden`}>
          <div className='absolute bottom-0 w-full h-1 bg-ui-green2'></div>
        </div>
        <button onClick={() => setAddContentType('Income')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Income' ? 'text-black' : 'text-white'}`}>Income</button>
        <button onClick={() => setAddContentType('Expense')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Expense' ? 'text-black' : 'text-white!'}`}>Expense</button>
        <button onClick={() => setAddContentType('Transfer')} className={`relative py-4 w-1/3 h-full font-semibold ${addContentType === 'Transfer' ? 'text-black' : 'text-white'}`}>Transfer</button>
      </nav>

      <h1 className='text-2xl font-bold text-center p-2'>{addContentType}</h1>
      <div className='flex flex-col justify-center items-centerv p-3 gap-y-2'>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label htmlFor='Date'>Date :</label>
          <input id='Date' type='date' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label htmlFor='Amount'>Amount :</label>
          <input id='Amount' type='number' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label htmlFor='Catagory'>Catagory :</label>
          <input id='Catagory' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label htmlFor='Account'>Account :</label>
          <input id='Account' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>
        <div className='w-full flex'>
          <label htmlFor='Note'>Note :</label>
          <input id='Note' className='flex-1' />
        </div>
        <span className='h-0.5 w-full bg-zinc-300'></span>

        <div className='flex flex-col justify-center items-center gap-y-2 m-1'>
          <button className='bg-gradient-to-r from-[#62b79c] to-[#afd1a1] text-white font-bold rounded-2xl min-w-3/4 py-1'>Save</button>
          <button className='border rounded-2xl min-w-3/4 py-1'>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default dashboard