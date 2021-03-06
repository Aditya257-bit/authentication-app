import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const ResetPassword = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        resetPasswordLink: '',
        buttonText: 'Reset Password'
    })

    const { name, newPassword, resetPasswordLink, buttonText } = values;

    useEffect(() => {
        let resetPasswordLink = match.params.token;
        let { name } = jwt.decode(resetPasswordLink);
        if(resetPasswordLink){
            setValues({...values, name, resetPasswordLink})
        }
    }, [])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_URL}/reset-password`,
            data: { newPassword, resetPasswordLink }
        }).then((resp) => {
            setValues({...values, password: '', buttonText: 'Submitted'});
            toast.success(resp.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error)
        })
    }

    const resetPasswordForm = () => {
        return(
            <form>
                <div className='form-group mt-3'>
                    <label className='text-muted'>Password</label>
                    <input 
                        type='password' 
                        className='form-control' 
                        name='newPassword'
                        value={newPassword}
                        onChange={handleChange} 
                        placeholder='Enter your password' 
                    />
                </div>
                <div className='mt-3'>
                    <button className='btn btn-primary' onClick={handleSubmit}>{buttonText}</button>
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />
                <h1 className='p-5 text-center'>Hey {name}, Enter new password</h1>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
}

export default ResetPassword;