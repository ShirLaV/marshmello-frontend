import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

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

export const DynamicPopover = React.forwardRef(({ onClose, title, children }, parentRef) => {

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            })
        }
    }, [])

    useEffect(() => {
        window.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("mousedown", handleClick);
        }
    }, [parentRef])

    const handleClick = e => {
        if (targetRef.current.contains(e.target) || parentRef?.current?.contains(e.target)) {
            // inside click
            return
        }
        // outside click 
        onClose()
    }

    const getLocation = () => {
        const rect = parentRef?.current?.getBoundingClientRect()

        const bottomCheck = window.innerHeight - (rect.bottom + dimensions.height) < 20
        const topCheck = window.innerHeight - (rect.bottom + dimensions.height) < 20
        const rightCheck = window.innerWidth - (rect.left + dimensions.width) < 100
        const verticalCheck = bottomCheck && topCheck

        if (bottomCheck) {
            let bottom
            if (verticalCheck) bottom = '-400%'
            else if (topCheck) bottom = '-100%'
            else bottom = rect.height + 8
            if (rightCheck) return {bottom, right: 0}
            else return {bottom, left: 0}
        }
        if (rightCheck) return {top: rect.height + 8, right: 0}

        return {left: 0, top: rect.height + 8}
    }

    return (
        <div ref={targetRef} className="dynamic-popover" style={{ position: 'absolute', ...getLocation() }}>
            <div className="popover-header">
                <p>{title}</p>
                <span onClick={onClose}><IoMdClose /></span>
            </div>
            <div className="popover-content">
                {children}
            </div>
        </div>
    )
})
