import { CommentSVG, LikeSVG, SavedSVG, SharePostSVG } from 'assets/svg/svg'

const RemoveSVG = ({ ...props }) => (
  <svg {...props} role="img" viewBox="0 0 24 24">
    <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
  </svg>
)

const UnlikeSVG = ({ ...props }) => (
  <svg {...props} role="img" viewBox="0 0 48 48">
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
)

const likeIcon = (
  <LikeSVG
    aria-label="Like"
    height="24"
    width="24"
    fill="currentColor"
    stroke="transparent"
    className="text-gray-900 hover:text-gray-500"
  />
)

const removeIcon = (
  <RemoveSVG
    aria-label="Remove"
    color="#262626"
    fill="#262626"
    height="24"
    width="24"
  />
)

const unlikeIcon = (
  <UnlikeSVG
    aria-label="Unlike"
    color="#ed4956"
    fill="#ed4956"
    height="24"
    width="24"
  />
)
const commentIcon = (
  <CommentSVG
    aria-label="Comment"
    height="24"
    width="24"
    fill="currentColor"
    stroke="transparent"
    className="text-gray-900 hover:text-gray-500"
  />
)

const sharePostIcon = (
  <SharePostSVG
    aria-label="Share Post"
    height="24"
    width="24"
    fill="currentColor"
    stroke="transparent"
    className="text-gray-900 hover:text-gray-500"
  />
)

const savedIcon = (
  <SavedSVG
    aria-label="save"
    height="24"
    width="24"
    fill="currentColor"
    stroke="transparent"
  />
)

export {
  removeIcon,
  unlikeIcon,
  likeIcon,
  commentIcon,
  sharePostIcon,
  savedIcon,
}
