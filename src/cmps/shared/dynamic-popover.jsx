import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsChevronLeft } from 'react-icons/bs'

/*
    How-to-use
    1. The component shall recieve:
       * an onClose function that closes the popover
       * a title for the header
       * the component that should be rendered inside of the popover (children)
    2. The popover should be rendered on the same lavel as the element that 
       triggers the opening of the popover
    3. The parrent element of both the trigger element and the popover should have
       position relative (className="relative")
    4. The popover should recieve the parent ref (ref={parentRef})
    5. The state for the opening and closing of the popover should be managed from 
       outside 
*/

export const DynamicPopover = React.forwardRef(({ onClose, title, children, isLabel, handleEdit }, parentRef) => {
    const targetRef = useRef()
    const contentRef = useRef()
    const [location, setLocation] = useState({
        top: null,
        bottom: null,
        right: null,
        left: null
    })

    useEffect(() => {
        if (targetRef.current) {
            getLocation({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            })
        }
        const handleClick = e => {
            const containerElement = targetRef.current
            if (containerElement?.contains(e.target) || parentRef?.current?.contains(e.target)) return
            onClose()
        }

        window.addEventListener("mouseup", handleClick)
        window.addEventListener("resize", getLocation)
        return () => {
            window.removeEventListener("mouseup", handleClick)
            window.removeEventListener("resize", getLocation)
        }
    }, [onClose, parentRef])


    const getLocation = ({ width, height }) => {
        const rect = parentRef.current?.getBoundingClientRect()
        if (!rect) return
        let left, right, top, bottom
        // if (window.innerWidth < 500) {
        //     // parentRef.current.classList.remove('relative')
        //     if (window.innerHeight - (rect.bottom + height) > 20) {
        //         top = rect.bottom + 8
        //         left = '50%'
        //     } else if (height + 20 < window.innerHeight) {
        //         bottom = rect.top - 8
        //         left = '50%'
        //     }

        // }
        const rightCheck = window.innerWidth - (rect.left + width) < 100
        const isFullHeight = (window.innerHeight - height - 45) < 0

        top = rect.height + 8
        if (rightCheck) right = 0
        else left = 0
        console.log(window);
        console.log(rect);
        if (isFullHeight) {
            contentRef.current.style.maxHeight = `${window.innerHeight - rect.bottom - 60}px`
        } else {
            let maxHeight = 350
            if (!height) { // for resize
                maxHeight = window.innerHeight - rect.bottom - 60
            }
            if (contentRef.current) contentRef.current.style.maxHeight = `${maxHeight}px`
        }
        setLocation({ top, bottom, right, left })
    }

    return (
        <div ref={ref => targetRef.current = ref} className="dynamic-popover" style={{ position: 'absolute', ...location }}>

            {title
                ?
                <div className="popover-header">
                    {isLabel && <span className="back-btn" onClick={handleEdit}><BsChevronLeft /></span>}
                    <p>{title}</p>
                    <span className="close-btn" onClick={onClose}><IoMdClose /></span>
                </div>
                :
                <div className="relative" style={{ height: 16 }}>
                    <span className="close-popover-icon" onClick={onClose}><IoMdClose /></span>
                </div>}

            <div className="popover-content" ref={contentRef}>
                {children}
            </div>
        </div>
    )
})
