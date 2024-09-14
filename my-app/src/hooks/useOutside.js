import { useEffect } from 'react'

export default function useOutside(ref, isExpanded, toggleDropdown) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isExpanded) {
        toggleDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, isExpanded, toggleDropdown])
}
