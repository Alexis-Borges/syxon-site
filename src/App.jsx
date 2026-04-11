import { useEffect, useRef } from 'react'
import Nav        from './components/Nav'
import Hero       from './components/Hero'
import Concept    from './components/Concept'
import Offre      from './components/Offre'
import Process    from './components/Process'
import Realisations from './components/Realisations'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const rx = useRef(0)
  const ry = useRef(0)

  useEffect(() => {
    let mx = 0, my = 0
    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top  = my + 'px'
      }
      rx.current += (mx - rx.current) * 0.12
      ry.current += (my - ry.current) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px'
        ringRef.current.style.top  = ry.current + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2.5)'
      if (ringRef.current)   ringRef.current.style.transform   = 'translate(-50%,-50%) scale(1.5)'
    }
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current)   ringRef.current.style.transform   = 'translate(-50%,-50%) scale(1)'
    }

    const interactables = document.querySelectorAll('a, button, input, select, textarea')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <Nav />
      <Hero />
      <Concept />
      <Offre />
      <Process />
      <Realisations />
      <Contact />
      <Footer />
    </>
  )
}
