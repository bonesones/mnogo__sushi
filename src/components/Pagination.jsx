import {useEffect, useState} from "react";

export default function Pagination (props) {
    const pageNumbers = []
    console.log(props.totalOrders)
    const [digitsToShow, setDigitsToShow] = useState([])
    for(let i = 1; i <= Math.ceil(props.totalOrders / props.ordersPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        if(pageNumbers.length <= 3) {
            setDigitsToShow([...pageNumbers])
        } else if(props.currentPage === 1) {
            setDigitsToShow([...pageNumbers.slice(0, 3)])
        } else if (props.currentPage === pageNumbers.length) {
            setDigitsToShow([...pageNumbers.slice(pageNumbers.length - 3, pageNumbers.length )])
        } else {
            setDigitsToShow([...pageNumbers.slice(props.currentPage - 2, props.currentPage), ...pageNumbers.slice(props.currentPage, props.currentPage + 1)])
        }
    }, [props.currentPage]);

    return (
        <div className="flex justify-center">
            <ul className="pagination flex gap-10 flex">
                {
                    digitsToShow.map(number => (
                        <li className="page-item" key={number}>
                            <button type="button" className={(props.currentPage === number && "bg-red-600 text-white ") + "page-link px-3 py-1.5 rounded-md text-xl"} onClick={() => props.paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}