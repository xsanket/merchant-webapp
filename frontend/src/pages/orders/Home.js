import React from 'react'
import { Button, Layout, Modal } from 'antd'
import MenuForm from './MenuForm'

function Home() {
    const [open, setOpen] = React.useState(false);



    return (
        <div>
            <div className='flex justify-end'>
                <Button type='primary' onClick={() => setOpen(true)}>Add Menu</Button>
            </div>

            {open && <MenuForm open={open} setOpen={setOpen}/>}

        </div>
    )
}

export default Home