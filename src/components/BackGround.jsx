export default function BackGround({ onClick, active }) {
  return (
    <div
      className={
        (active ? "block overflow-hidden " : "hidden ") +
        "background fixed top-0 left-0 z-10 size-full bg-black opacity-30"
      }
      onClick={onClick}
    ></div>
  );
}
