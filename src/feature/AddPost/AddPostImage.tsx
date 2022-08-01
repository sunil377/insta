import { MediaSVG } from '../../assets/svg/svg'

const mediaIcon = (
  <MediaSVG
    aria-label="Icon to represent media such as images or videos"
    color="#262626"
    fill="#262626"
    height="77"
    width="96"
    className="mx-auto"
  />
)

export default function AddPostImage(props: AddPostImageProps) {
  return (
    <div className="pb-4 flex flex-col h-[75vh] w-[75vw] sm:w-[50vw] max-w-[480px]">
      <div className="text-center py-2 border-b">
        <h3 className="text-md font-semibold leading-6">Create new post</h3>
      </div>
      <div className="text-center grid place-items-center place-content-center basis-full">
        {mediaIcon}
        <div className="my-5">
          <h2 className="text-2xl font-light">Drag phots and videos here</h2>
        </div>
        <label
          className="cursor-pointer bg-primary-main text-white py-1.5 px-2.5 text-sm capitalize rounded-md focus-within:outline outline-black outline-1"
          {...props}
        ></label>
      </div>
    </div>
  )
}

interface AddPostImageProps {}
