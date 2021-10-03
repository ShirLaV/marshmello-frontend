import React from 'react'
import { SiTrello } from 'react-icons/si'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onLogin } from '../store/user.actions'
import heroImg from '../assets/img/hero.png'
import productImg from '../assets/img/homepage-product.jpg'



class _HomePage extends React.Component {

    state = {
        isNavbarBG: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.changeHeaderStyle)
        document.body.style.overflowY = 'scroll'
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.changeHeaderStyle)
        document.body.style.overflowY = 'hidden'
    }

    changeHeaderStyle = () => {
        const { isNavbarBG } = this.state
        if (window.scrollY > 50 && !isNavbarBG) {
            this.setState({ isNavbarBG: true })
        } else if (window.scrollY < 50 && isNavbarBG) {
            this.setState({ isNavbarBG: false })
        }
    }

    onGuestLogin = () => {
        this.props.onLogin({username: 'rick@sanchez.com', password: 'rick123'})
        this.props.history.push('/board')
    }

    render() {
        const { isNavbarBG } = this.state
        return (
            <section className="home-page main-container">
                <header className={`home-header ${(isNavbarBG) ? 'bg-visible' : ''}`}>
                    <span className="logo"> <SiTrello /> Marshmello</span>
                    <div className="header-buttons">
                        <Link to="/login"><button className="login-btn nav-button">Log in</button></Link>
                        <Link to="/signup"><button className="signup-btn nav-button">Sign up</button></Link>
                    </div>
                </header>
                <div className="home-first-fold">
                    <div className="first-fold-text">
                        <h1>Marshmello helps teams move work forward.</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is unique—accomplish it all with Marshmello.</p>
                        <button className="cta-btn nav-button" onClick={() => this.onGuestLogin()}>Get Started!</button>
                    </div>
                    <div className="first-fold-img">
                        <img src={heroImg} alt="hero" />
                    </div>
                </div>
                <div className="home-second-fold">
                    <div className="second-fold-text">
                        <h1>It’s more than work. It’s a way of working together.</h1>
                        <p>Start with a Marshmello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
                    </div>
                    <div className="second-fold-img">
                        <img src={productImg} alt="hero" />
                    </div>
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users
    }
}

const mapDispatchToProps = {
    onLogin
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)