import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({children, history, match}) => {

    const isActive = (path) => {
        if(match.path === path){
            return {color: 'black'};
        }
        else{
            return {color: 'white'};
        }
    }

    const nav = () => (
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'>
                <Link to='/' className='nav-link' style={isActive("/")}>
                    Home
                </Link>
            </li>
            {
                !isAuth() && (
                    <>
                        <li className='nav-item'>
                            <Link to='/signup' className='nav-link' style={isActive("/signup")}>
                                Signup
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/signin' className='nav-link' style={isActive("/signin")}>
                                Signin
                            </Link>
                        </li>
                    </>
                )
            }
            {
                isAuth() && isAuth().role === 'admin' && (
                    <li className='nav-item'>
                        <Link className="nav-link" style={isActive('/admin')} to="/admin">
                            {isAuth().name}
                        </Link>
                    </li>
                )
            }
            {
                isAuth() && isAuth().role === 'subscriber' && (
                    <li className='nav-item'>
                        <Link className="nav-link" style={isActive('/private')} to="/private">
                            {isAuth().name}
                        </Link>
                    </li>
                )
            }
            {
                isAuth() && (
                    <li className='nav-item'>
                        <span 
                            className='nav-link' 
                            style={{ cursor: 'pointer', color: '#fff' }} 
                            onClick={
                                () => signout(() => {
                                history.push('/')
                                })
                            }
                        >
                            Signout
                        </span>
                    </li>
                )
            }
        </ul>
    )

    return(
        <Fragment>
            {nav()}
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);