import { useEffect, useState } from 'react'
import slider2 from '../../assets/images/login_slider_2.png'
import slider3 from '../../assets/images/login_slider_3.png'
import background from '../../assets/images/login_slider_background.png'
import sliderOne from '../../assets/images/login_slider_one.png'
import { media_query_lg } from '../../data/mediaQuery'
import useMedia from '../../hooks/useMedia'

export default function Slider(props: SliderProps) {
  const [active, setActive] = useState(0)
  const isMatch = useMedia(media_query_lg)

  useEffect(() => {
    let timer: NodeJS.Timer

    if (isMatch) {
      timer = setInterval(() => {
        setActive(prev => (prev === 2 ? 0 : prev + 1))
      }, 3000)
    }

    return function cleanup() {
      timer && clearInterval(timer)
    }
  }, [isMatch])

  return (
    <div className={`lg:pt-10 ${isMatch ? '' : 'hidden'}`}>
      <div
        className="w-full h-full relative overflow-hidden bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPositionY: '40px',
        }}
      >
        <img
          src={sliderOne}
          alt="beautiful girl with cat post"
          style={{
            zIndex: active === 0 ? 0 : -1,
            opacity: active === 0 ? 1 : 0,
          }}
          className="inset-0 absolute w-[209px] transition-opacity duration-300 top-[56px] left-[126px]"
        />

        <img
          src={slider2}
          alt="beautiful couple with apple on forhead"
          style={{
            zIndex: active === 1 ? 0 : -1,
            opacity: active === 1 ? 1 : 0,
          }}
          className="inset-0 absolute w-[209px] transition-opacity duration-300 top-[56px] left-[126px]"
        />

        <img
          src={slider3}
          alt="random profile with some info"
          style={{
            zIndex: active === 2 ? 0 : -1,
            opacity: active === 2 ? 1 : 0,
          }}
          className="inset-0 absolute w-[209px] transition-opacity duration-300 top-[56px] left-[126px]"
        />
      </div>
    </div>
  )
}

interface SliderProps {}
