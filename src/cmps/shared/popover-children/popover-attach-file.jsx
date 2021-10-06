import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateCard } from '../../../store/board.actions'
import { uploadImg } from '../../../services/cloudinary.service'



function _PopoverAttachFile({ onUpdateCard, onClose }) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const urlRef = useRef()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const res = cardEditService.handleFileAdd(url, title)
        onUpdateCard(...res)
        onClose()
    }

    const handleImageUpload = async (ev) => {
        const title = ev.target.files[0].name
        const url = await uploadImg(ev)
        const res = cardEditService.handleFileAdd(url, title)
        onUpdateCard(...res)
        onClose()
    }

    return (
        <div className="popover-attach-file">
            <div className="attach-from">
                <label htmlFor="upload" >
                    <span aria-hidden="true">Computer</span>
                    <input type="file" id="upload" style={{ display: 'none' }} onChange={handleImageUpload} />
                </label>
            </div>

            <form onSubmit={handleSubmit} className="attach-link">
                <label>Attach a link</label>
                <input ref={urlRef} className="search-input" placeholder="Paste any link here..." value={url} onChange={(ev) => setUrl(ev.target.value)} />
                {url && <><label>Link name (optional)</label><input className="search-input" value={title} onChange={(ev) => setTitle(ev.target.value)} /></>}
                <button className="card-edit-btn">Attach</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopoverAttachFile = connect(mapStateToProps, mapDispatchToProps)(_PopoverAttachFile);

