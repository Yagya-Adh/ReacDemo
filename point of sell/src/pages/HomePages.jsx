import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
const HomePages = () => {
    return (

        <MainLayout>
            <div className='bg-light p-5 mt-4 rounded-3'>
                <h1>Welcome to the simple pos for small business</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi nisi necessitatibus fugiat, recusandae harum nostrum sit veritatis nihil explicabo aliquid!</p>
                <p>If you have an issue, call 443-444-xxxxx anytimes</p>
                <Link to='/pos' className='btn btn-primary btn-sm ' >Click here to sell products</Link>
            </div>
        </MainLayout>
    )
}

export default HomePages