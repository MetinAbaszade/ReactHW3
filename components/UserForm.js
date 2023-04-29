import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserService } from '../services';
import * as Yup from 'yup';

export default function UserForm() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
        }),
        phone: Yup.string().required('Phone number is required'),
        website: Yup.string().url('Invalid website URL').required('Website is required'),
        company: Yup.object().shape({
            name: Yup.string().required('Company name is required')
        })
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        var result = await UserService.addUser(values);
        resetForm();
        alert(`User created with ID: ${result.id}`);
        setSubmitting(false);
    };

    return (
        <div>
            <h2>Add User</h2>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    address: {
                        street: ''
                    },
                    phone: '',
                    website: '',
                    company: {
                        name: ''
                    }
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" />
                        <ErrorMessage name="name">
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" type="text" />
                        <ErrorMessage name="username">
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" />
                        <ErrorMessage name="email">
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <h5 className='m-0'>Address</h5>
                        <label htmlFor="address.street">Street</label>
                        <Field id="address.street" name="address.street" type="text" />
                        <ErrorMessage name="address.street" className='text-danger'>
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <label htmlFor="phone">Phone</label>
                        <Field id="phone" name="phone" type="number" />
                        <ErrorMessage name="phone" className='text-danger'>
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <label htmlFor="website">Website</label>
                        <Field id="website" name="website" type="url" />
                        <ErrorMessage name="website" className='text-danger'>
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <h5 className='m-0'>Company</h5>
                        <label htmlFor="company.name"> Name</label>
                        <Field id="company.name" name="company.name" type="text" />
                        <ErrorMessage name="company.name">
                            {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <button className='mt-3' type="submit" disabled={isSubmitting}>
                            Add User
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
