import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Profile({pageOpen}) {
  return (
    <div className={`flex flex-col p-4 ${pageOpen === 'profile' ? 'block' : 'hidden'}`}>
      <h1 className="text-[clamp(20px,5vw,30px)] font-semibold">
        Profile info
      </h1>
      <div className="flex flex-col p-1 divide-y divide-zinc-300 border-zinc-200 border rounded-2xl">
        <p className="py-3 pl-1.5 flex justify-between items-center">
          Profile Picture : <img src="Profile.jpg" className="w-14 rounded-full ring-2 ring-offset-2 ring-zinc-300 mr-3 " />
          </p>
        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Username : Skibidi 
          <FontAwesomeIcon icon={faPenToSquare} />
          </p>
        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Birthday : 1 / 1 / 0001 
          <FontAwesomeIcon icon={faPenToSquare} />
          </p>
        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Gender : Femboy
          <FontAwesomeIcon icon={faPenToSquare} />
          </p>
        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Email : kuyyai@gmail.com
          <FontAwesomeIcon icon={faPenToSquare} />
          </p>
        <p className="py-3 pl-1.5 pr-7 flex justify-between items-center">
          Password : ************
          <FontAwesomeIcon icon={faPenToSquare} />
          </p>
      </div>
    </div>
  );
}
