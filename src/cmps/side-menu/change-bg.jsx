import React from 'react';
import { connect } from 'react-redux';

import { onUpdateBoard } from '../../store/board.actions'

class _ChangeBG extends React.Component {

    setBoardBG = (backGround) => {
        const { board, onUpdateBoard } = this.props
        const style = (backGround[0] === '#') ? { bgColor: backGround } : { imgUrl: backGround }
        onUpdateBoard({ type: "CHANGE_BOARD_STYLE", style }, board)
    }

    render() {
        const images = ['https://images.pexels.com/photos/1914982/pexels-photo-1914982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1982485/pexels-photo-1982485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?cs=srgb&dl=pexels-irina-iriser-1408221.jpg&fm=jpg']
        const colors = ['#82E0AA', '#F1948A', '#AAB7B8 ', '#C39BD3', '#85C1E9', '#F8C471']

        return (
            <div className="change-bg">
                <div className="images">
                    {images.map((image, idx) =>
                        <div key={idx} className="img-container" onClick={() => this.setBoardBG(image)}>
                            <img src={image} alt={image} />
                        </div>
                    )}
                </div>
                <hr />
                <div className="colors">
                    {colors.map((color, idx) =>
                        <div style={{ backgroundColor: `${color}` }} key={idx} className="color-container" onClick={() => this.setBoardBG(color)}></div>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
    };
}
const mapDispatchToProps = {
    onUpdateBoard,
};

export const ChangeBG = connect(mapStateToProps, mapDispatchToProps)(_ChangeBG);