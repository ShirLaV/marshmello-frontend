import React from 'react'
import { SiTrello } from 'react-icons/si'
import { connect } from 'react-redux'
import heroImg from '../assets/img/hero.png'
import productImg from '../assets/img/homepage-product.png'


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

    render() {
        const { isNavbarBG } = this.state
        return (
            <section className="home-page">
                <header className={`home-header ${(isNavbarBG) ? 'bg-visible' : ''}`}>
                    <span className="logo"> <SiTrello /> Marshmello</span>
                    <div className="header-buttons">
                        <button className="login-btn nav-button">Log in</button>
                        <button className="signup-btn nav-button">Sign up</button>
                    </div>
                </header>
                <div className="home-first-fold">
                    <div className="first-fold-text">
                        <h1>Marshmello helps teams move work forward.</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is unique—accomplish it all with Marshmello.</p>
                        <button className="cta-btn nav-button" onClick={() => { this.props.history.push('/board') }}>Get Started!</button>
                    </div>
                    <div className="firs-fold-img">
                        <img src={heroImg} alt="hero" />
                    </div>
                </div>
                <div className="second-fold">
                    {/* <img src={productImg} alt="product" /> */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi quis incidunt suscipit quia doloremque. Vero dignissimos vel, doloremque reprehenderit, est fugit saepe eaque omnis dolore nam repellendus, voluptates porro rem?</p>
                    <img src={heroImg} alt="hero" />
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

export const HomePage = connect(mapStateToProps)(_HomePage)