import React from 'react';
import { connect } from 'react-redux';
import { activityTxtMap } from '../../services/activity.service';
import { unsplashService } from '../../services/unsplash.service';

import { onUpdateBoard } from '../../store/board.actions'

class _ChangeBG extends React.Component {
    state = {
        keyword: '',
        pics: []
    }

    async componentDidMount() {
        await this.getPics()
    }

    getPics = async () => {
        try {
            const pics = await unsplashService.getPreviewImgs('hills')
            this.setState({ pics })
        } catch (err) {
            console.log(err)
        }
    }

    onSearch = async () => {
        try {
            const pics = await unsplashService.search(this.state.keyword)
            this.setState({ pics })
        } catch (err) {
            console.log(err)
        }
    }

    setBoardBG = (backGround) => {
        const { board, onUpdateBoard } = this.props
        const style = (backGround[0] === '#') ? { bgColor: backGround } : { imgUrl: backGround }
        const activity = { txt: activityTxtMap.changeBackground() }
        onUpdateBoard({ type: "CHANGE_BOARD_STYLE", style }, board, activity)
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ keyword: value }, () => {
            if (value.length >= 3) this.onSearch()
            else if (value.length === 0) this.getPics()
        })
    }

    render() {
        const colors = ['#82E0AA', '#F1948A', '#AAB7B8 ', '#C39BD3', '#85C1E9', '#F8C471']

        const { keyword, pics } = this.state
        return (
            <div className="change-bg">
                <input type="text" className="search-input" value={keyword} onChange={this.handleChange} placeholder="Search images" />
                <div className="images">
                    {pics.map(pic =>
                        <div key={pic.id} className="img-container" onClick={() => this.setBoardBG(pic.full)}>
                            <img src={pic.preview} alt={pic.id} />
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