import React, { useEffect, useRef, useState } from 'react'
import { PopoverHeader } from './popover-header'

/*
    How-to-use
    1. The component shall recieve:
       * an onClose function that closes the popover
       * a title for the header
       * the component that should be rendered inside of the popover (children)
    2. The popover should be rendered on the same lavel as the element that 
       triggers the opening of the popover
    3. The parrent element of both the trigger element and the popover should have
       position relative (className="pos-relative")
    4. The popover should recieve the parent ref (ref={parentRef})
    5. The state for the opening and closing of the popover should be managed from 
       outside 
*/

export const DynamicPopover = React.forwardRef(({ onClose, title, children, isMultiView, onGoBack }, parentRef) => {
    const targetRef = useRef()
    const contentRef = useRef()
    const [location, setLocation] = useState({
        top: null,
        bottom: null,
        right: null,
        left: null
    })

    useEffect(() => {
        getLocation({
            width: targetRef.current?.offsetWidth,
            height: targetRef.current?.offsetHeight
        })

        const handleClick = e => {
            const containerElement = targetRef.current
            const parentElement = parentRef.current
            if (containerElement?.contains(e.target) || parentElement?.contains(e.target)) return
            onClose()
        }

        window.addEventListener("mouseup", handleClick)
        window.addEventListener("resize", getLocation)

        return () => {
            window.removeEventListener("mouseup", handleClick)
            window.removeEventListener("resize", getLocation)
        }
    }, [parentRef])


    const getLocation = ({ width, height }) => {
        const rect = parentRef.current?.getBoundingClientRect()
        if (!rect) return
        let left, right, top, bottom
        const rightCheck = window.innerWidth - (rect.left + width) < 20
        const leftCheck = rect.right - width < 20
        const isOverflowY = (window.innerHeight - height - 45) < 0
        if (window.innerWidth < 500) {
            const parentEl = targetRef.current
            parentEl.classList.remove('pos-absolute')
            parentEl.classList.add('pos-fixed')
            parentEl.style.top = `${(rect.bottom + 8)}px`
            parentEl.style.left = '50%'
            parentEl.style.transform = 'translateX(-50%)'
            return
        }

        top = rect.height + 8
        if (rightCheck) right = 0
        else left = 0
        if (isOverflowY) {
            contentRef.current.style.maxHeight = `${window.innerHeight - rect.bottom - 60}px`
        } else {

            const maxHeight = (height) ? 350 : (window.innerHeight - rect.bottom - 60)

            if (contentRef.current) contentRef.current.style.maxHeight = `${maxHeight}px`
        }
        setLocation({ top, bottom, right, left })
    }
    

    return (
        <div ref={ref => targetRef.current = ref} className="dynamic-popover pos-absolute" style={{ ...location }}>

            <PopoverHeader title={title || null} isMultiView={isMultiView} onGoBack={onGoBack} onClose={onClose} />

            <div className="popover-content" ref={contentRef}>
                {children}
            </div>

        </div>
    )
})
