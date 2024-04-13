import React, { useState, useEffect } from 'react';
import { Button, Layout, Modal } from 'antd';
import MenuForm from './MenuForm.js';
import { getMenu } from '../../apicalls/menuApiCall.js';
import MenuItems from '../../components/MenuItems.js';

function Home() {
    const [open, setOpen] = useState(false);
    const [menus, setMenus] = useState([]);


    const fetchAndSetMenus = async () => {
        try {
            const response = await getMenu();
            console.log("response == ", response);
            const fetchedMenus = response.data;
            console.log("fetchedMenus == ", fetchedMenus);
            setMenus(fetchedMenus);
        } catch (error) {
            console.error('Error fetching menus:', error.message);
        }
    };

    useEffect(() => {
        fetchAndSetMenus();
    }, []);

    const reloadData = () => {
        fetchAndSetMenus();
    };

    const handleDelete = async (id) => {

    }


    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <div className="text-center flex-grow">
                    <h2 className="text-2xl font-semibold">My Menu</h2>
                </div>
                <div className='mr-16'>
                    <Button type='primary' onClick={() => setOpen(true)}>Add Menu</Button>
                </div>
            </div>


            {open && <MenuForm open={open} setOpen={setOpen} reloadData={reloadData} />}


            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {menus.length > 0 ? (
                    <>

                        <ul className=" gap-8 cursor-pointer sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                            {menus.map((menu) => {
                                console.log("menu ==== ", menu);
                                return (
                                    <MenuItems key={menu._id} id={menu._id} menu={menu} onDelete={handleDelete} />
                                )
                            })}
                        </ul>
                    </>
                ) : (
                    <div>No menus available.</div>
                )}
            </div>
        </div>
    );
}

export default Home;