import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

export function DynamicPopover({ onClose, title, children, rect, element }) {
    // console.log(rect);
    // console.log(element);

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
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
          }
    })

    const handleClick = e => {
        if (targetRef.current.contains(e.target) || element?.contains(e.target)) {
          // inside click
          return
        }
        // outside click 
        onClose()
      }

    const getLocation = () => {
        const distanceFromBottom = window.innerHeight - rect.bottom
        if (distanceFromBottom > dimensions.height) return { left: rect.left, top: rect.bottom + 10 }
        else if (dimensions.height < (rect.top - 45)) return { left: rect.left, top: (rect.top - dimensions.height - 10) }
        else return { top: 45, left: (rect.left + rect.width + 10) }
    }

    return (
        <div ref={targetRef} className="dynamic-popover" style={{ position: 'fixed', ...getLocation() }}>
            <div className="popover-header">
                <p>{title}</p>
                <span onClick={onClose}><IoMdClose /></span>
            </div>
            <div className="popover-content">
                {children}
            </div>
        </div>
    )
}
