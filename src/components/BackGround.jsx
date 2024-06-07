import {useEffect} from "react";

export default function BackGround({ onClick, active }) {
  return active && (
      <div
          className="block overflow-hidden fixed top-0 left-0 z-10 size-full bg-black opacity-30"
          onClick={onClick}
      ></div>
  )
}
