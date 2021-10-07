import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login'

// import { userService } from '../services/user.service'
import { onLogin, onSignup, loadUsers, onGoogleLogin } from '../store/user.actions'
import { Link } from 'react-router-dom'
import { SiTrello } from 'react-icons/si'
import svgRight from '../assets/img/login-svg-right.svg'
import svgLeft from '../assets/img/login-svg-left.svg'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

class _LoginSignup extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        pageMode: null
    }

    async componentDidMount() {
        await this.props.loadUsers()
        const pageMode = this.props.location.pathname === '/login' ? 'login' : 'signup'
        this.setState({ pageMode })
    }

    validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 6) {
            errors.username = 'Please use at least 6 characters'
        }
        if (values.password.length < 4) {
            errors.password = 'Password is too short'
        }
        if (!values.fullname) {
            errors.fullname = 'Required'
        } else if (values.fullname.length < 4) {
            errors.fullname = 'Please use at least 4 characters'
        }
        return errors
    }

    onSuccessGoogle = (res) => {
        const { tokenId } = res
        const { onGoogleLogin } = this.props
        onGoogleLogin(tokenId)
        this.props.history.push('/board')
    }

    onFailureGoogle = (res) => {
        console.log('Login with google failed', res)
    }

    onSubmit = (values) => {
        const { pageMode } = this.state
        const { onLogin, onSignup } = this.props
        pageMode === 'login' ? onLogin(values) : onSignup(values)
        this.props.history.push('/board')
    }

    render() {
        const { credentials, pageMode } = this.state
        return (
            <section className="login-signup-page main-container">
                <div className="login-signup-header">
                    <SiTrello />
                    <h3 className="logo-text">Marshmello</h3>
                </div>
                {pageMode === 'login' && <div className="login-signup flex column">
                    <h3>Log in to Marshmello</h3>
                    <Formik initialValues={credentials} onSubmit={this.onSubmit} >
                        <Form className="login-form flex column">
                            <Field type="username" placeholder="Enter user name" name="username" autoFocus />
                            <ErrorMessage name="username" component="div" />
                            <Field type="password" placeholder="Enter password" name="password" autoComplete="off" />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" className="login-signup-btn nav-button" style={{color: '#172b4d'}}>Log in</button>
                        </Form>
                    </Formik>
                    OR
                    <br />
                    <GoogleLogin
                        className="google-login-btn flex align-center justify-center"
                        clientId='209268489709-ofnqpgb55aikiprlelkbiafntgld4mhg.apps.googleusercontent.com'
                        buttonText='Continue with Google'
                        onSuccess={this.onSuccessGoogle}
                        onFailure={this.onFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Link to="/signup">Sign up for an account</Link>
                </div>}
                {pageMode === 'signup' &&
                    <div className="login-signup flex column">
                        <h3>Sign up for your account</h3>
                        <Formik initialValues={credentials} validateOnChange={false} validateOnBlur={false} validate={this.validate} onSubmit={this.onSubmit}>
                            <Form className="flex column">
                                <Field type="fullname" placeholder="Enter full name" name="fullname" autoFocus />
                                <ErrorMessage name="fullname" component="p" />
                                <Field type="username" placeholder="Enter user name" name="username" />
                                <ErrorMessage name="username" component="p" />
                                <Field type="password" placeholder="Enter password" name="password" />
                                <ErrorMessage name="password" component="p" />
                                <button type="submit" className="login-signup-btn nav-button" style={{color: '#172b4d'}}>Sign up</button>
                            </Form>
                        </Formik>
                        {/* <hr /> */}
                        <Link to="/login">Already have an account ? Log In</Link>
                    </div>}
                <div className="right-svg">
                    <img src={svgRight} alt="right-svg" />
                </div>
                <div className="left-svg">
                    <img src={svgLeft} alt="left-svg" />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadUsers,
    onLogin,
    onSignup,
    onGoogleLogin
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)