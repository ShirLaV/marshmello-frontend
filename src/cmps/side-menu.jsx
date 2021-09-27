import React from 'react';
import { connect } from 'react-redux';

class _SideMenu extends React.Component {
    state = {
        currViewId: null
    }




    render() {
        return (
            <div className="side-menu">
                <div className="title popover-header">
                    <p>Side Menu</p>
                </div>
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