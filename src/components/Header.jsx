import React from "react"
import Burger from "./../assets/burger-menu.png"

export default function Header() {
    return (
        <header>
            <div className="top-header flex">
                <button className="bg-transparent rounded-full" type="button">
                    <img src={Burger} />
                </button>
            </div>
        </header>
    )
}