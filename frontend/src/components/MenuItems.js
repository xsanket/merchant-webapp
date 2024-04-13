import React from 'react';
import { FaTrash } from "react-icons/fa";

function MenuItems({ id, menu, onDelete }) {
    console.log("menu == ", menu)
    return (
        <li className="relative bg-white rounded-md shadow-md overflow-hidden transition-shadow duration-150 ease-in-out hover:shadow-lg m-3 w-full">
            <div className="flex flex-col justify-between">
                <img
                    className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                    src={`/uploads/${menu.image}`}
                    alt={menu.dishName}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{menu.dishName}</h3>
                    <p className="text-sm">{menu.description}</p>
                    <p className="text-md font-bold">${menu.price}</p>
                    {onDelete && (
                    <FaTrash
                        className="absolute bottom-5 right-4 h-[14px] cursor-pointer text-red-500 z-99"
                        onClick={() => onDelete(id)}
                    />
                )}
                </div>
                
            </div>
        </li>
    );
}

export default MenuItems;
