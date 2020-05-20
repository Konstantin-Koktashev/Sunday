import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNav() {
    return (
        <div>
            <NavLink to='/home' className='logo'>
        <img src=''></img>
        Logo
            </NavLink>

            <NavLink to='/user/inbox' className='inbox'>
        <img src=''></img>
        Inbox
            </NavLink>
            <NavLink to='/user/myWeek' className='my-week'>
        <img src=''></img>
            </NavLink>
            My Week
            <NavLink to='/user/invite' className='invite'>
        <img src=''></img>
            </NavLink>
            <NavLink to='/user/profile' className='search'>
        <img src=''></img>
        Profile
            </NavLink>
            
        </div>
    )
}
