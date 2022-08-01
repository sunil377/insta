import appleStore from '../assets/images/AppleStore.png'
import googlePlay from '../assets/images/googlePlay.png'

export default function AppStore() {
  return (
    <div className="inline-flex gap-x-2">
      <a href="#appleStore">
        <img
          src={appleStore}
          width="136"
          alt="download on the apple app store"
        />
      </a>
      <a href="#googleplay">
        <img src={googlePlay} width="136" alt="get iton google play store" />
      </a>
    </div>
  )
}
