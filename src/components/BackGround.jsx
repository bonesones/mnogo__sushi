export default function BackGround({ onClick, reference, active }) {
    return (
        <div className={active ? "block" : " " + "modal-nav__background absolute top-0 left-0 z-10 size-full bg-black opacity-40" }
                 onClick={onClick}
                 ref={reference}
            >
        </div>
    )
}