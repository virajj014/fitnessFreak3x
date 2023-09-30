"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup'
const Navbar = () => {
    const [isloggedin, setIsloggedin] = React.useState<boolean>(false)

    const [showpopup, setShowpopup] = React.useState<boolean>(false)
    const checklogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.ok) {
                    setIsloggedin(true)
                }
                else{
                    setIsloggedin(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    React.useEffect(() => {
        checklogin()
    }, [showpopup])

    return (
        <nav>
            <Image src={logo} alt="Logo" />
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/profile'><IoIosBody /></Link>
            {
                isloggedin ?
                    <button>Logout</button>
                    :
                    <button
                        onClick={() => {
                            setShowpopup(true)
                        }}
                    >Login</button>



            }

            {
                showpopup && <AuthPopup setShowpopup={setShowpopup} />
            }
        </nav>
    )
}

export default Navbar