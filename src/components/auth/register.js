import React, { useEffect } from 'react';
import { Form, Field, withFormik } from 'formik/dist/index';
import { connect } from 'react-redux';
import { Button } from 'pcln-design-system';
import { Container } from './authStyle';
import {loginUser, errorClean, registerUser} from '../../actions/authActions';
import Errors from "../reuseableParts/Errors";
import * as Yup from 'yup';




const RegForm = props => {
    useEffect(() => {
        props.errorClean();
    }, [props.values]);

    return (
        <>
            <Container className="container">
                <div className="map"></div>
                <div className="form-container">
                    <Form className="form-contents">
                        <h1>Registration</h1>
                        <Errors errMsg={props.error} />

                        <label>
                            Username
                            <Field className="form-inputs" type="text" name="username" />
                            {props.touched.username && props.errors.username && (
                                <p className="error-message">{props.errors.username}</p>
                            )}
                        </label>
                        <label>
                            Password
                            <Field className="form-inputs" type="password" name="password" />
                            {props.touched.password && props.errors.password && (
                                <p className="error-message">{props.errors.password}</p>
                            )}
                        </label>
                        <label>
                            Email
                            <Field className="form-inputs" type="email" name="email" />
                            {props.touched.email && props.errors.email && (
                                <p className="error-message">{props.errors.email}</p>
                            )}
                        </label>
                        <div className="btn-container">
                            <Button className="submit-btn" color="primary" type="submit">
                                Submit
                            </Button>

                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
};

const FormikRegForm = withFormik({
    mapPropsToValues({ username, password, email }) {
        return {
            username: username || '',
            password: password || '',
            email: email || '',
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Please enter a username'),
        password: Yup.string().required('Enter a password'),
        email: Yup.string().required('Enter a email'),
    }),

    handleSubmit(values, { props }) {
        props.registerUser(values, props.history);
    }
})(RegForm);

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        error: state.authReducer.error
    };
};

export default connect(
    mapStateToProps,
    { loginUser, errorClean, registerUser }
)(FormikRegForm);