import React from 'react';
import { connect } from 'react-redux';

class _SideMenu extends React.Component {

    render() {
        return (
            <div className="side-menu">
                <h1>Side Menu</h1>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
    }
}
const mapDispatchToProps = {
}

export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(_SideMenu);