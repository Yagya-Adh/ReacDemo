import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MainLayout = ({ children }) => {
    return (
        <div>

            <div>
                <header>
                    <nav className="navbar bg-primary">
                        <div className="container">
                            <Link to='/pos' className="navbar-brand" >PoS</Link>
                        </div>
                    </nav>
                </header>
                <main>
                    <div className='container mt-3'>
                        {children}
                    </div>
                    <ToastContainer />
                </main>
            </div>


        </div>
    )
}

export default MainLayout