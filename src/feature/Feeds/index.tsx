import placeholder from 'assets/images/placeholder.jpg'
import { bigSavedIcon } from 'components/navbar/svg'
import { Picture } from 'components/Picture'
import { Button, IconButton } from 'components/ui'
import { get_url_explore_post, get_url_profile } from 'data/url'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Post } from 'services/post'
import {
  commentIcon,
  likeIcon,
  removeIcon,
  sharePostIcon,
  unlikeIcon,
} from './assets/svg'
import FeedOptions from './FeedOptions'
import { useActionButton, useActionFollowing } from './hooks'

export default function Feed(post: Post) {
  const { username, userid } = post
  const { pathname } = useLocation()
  const { postId: postParamsId } = useParams()

  const { isLiked, isSaved, toggleLike, toggleSaved } = useActionButton(post)

  const isExplorerActive = postParamsId
    ? pathname === get_url_explore_post(postParamsId)
    : false

  const Username = () => (
    <Link to={get_url_profile(userid)}>
      <strong>{username} </strong>
    </Link>
  )

  const LikeButton = () => {
    return (
      <IconButton onClick={toggleLike}>
        {isLiked ? unlikeIcon : likeIcon}
      </IconButton>
    )
  }

  const SavedButton = () => (
    <IconButton className="ml-auto" onClick={toggleSaved}>
      {isSaved ? removeIcon : bigSavedIcon}
    </IconButton>
  )

  return isExplorerActive ? (
    <ExploreFeedPost
      title={Username}
      likeButton={LikeButton}
      savedButton={SavedButton}
      {...post}
    />
  ) : (
    <FeedPost
      title={Username}
      likeButton={LikeButton}
      savedButton={SavedButton}
      {...post}
    />
  )
}

interface Props extends Post {
  title: () => JSX.Element
  likeButton: () => JSX.Element
  savedButton: () => JSX.Element
}

function ExploreFeedPost({
  mediaPath,
  userid,
  comments,
  likes,
  caption,
  createdAt,
  title: Title,
  likeButton: LikeButton,
  savedButton: SavedButton,
}: Props) {
  const { isFollowings, toggleFollowing } = useActionFollowing(userid)

  return (
    <article className="bg-white border border-gray-300 rounded-md grid grid-cols-2">
      <div className="aspect-square w-full max-w-sm">
        <Picture path={mediaPath} className="object-contain" alt="random" />
      </div>
      <div className="flex flex-col">
        <header className="grid grid-cols-[32px,1fr,32px] items-center px-4 py-2">
          <div className="">
            <img
              src={placeholder} /* replace src  */
              alt="random"
              className="rounded-full object-cover aspect-square"
            />
          </div>
          <p className="px-5 text-sm flex gap-x-4 items-center">
            <Title />
            {isFollowings ? (
              <button className="font-semibold" onClick={toggleFollowing}>
                Followings
              </button>
            ) : (
              <Button variant="text" onClick={toggleFollowing}>
                follow
              </Button>
            )}
          </p>
          <div>
            <FeedOptions id={userid} />
          </div>
        </header>
        <section>
          <p className="text-gray-500 text-center py-2">
            {comments.length && comments.length > 0
              ? `view all ${comments.length} comments`
              : 'No comment'}{' '}
          </p>
        </section>
        <footer className="p-4 text-sm space-y-3 mt-auto">
          <div className="flex gap-4 items-center">
            <LikeButton />
            <IconButton>{commentIcon}</IconButton>
            <IconButton>{sharePostIcon}</IconButton>
            <SavedButton />
          </div>
          <div className="space-y-2">
            <p>{likes?.length || 0} likes</p>
            {/* <p className="font-semibold">8,256 views</p> */}
            <p>
              <Title />
              <span>{caption}</span>
            </p>
            <p className="text-xs text-gray-500">
              {createdAt?.toDate().toDateString()}
            </p>
          </div>
        </footer>
      </div>
    </article>
  )
}

function FeedPost({
  userid,
  mediaPath,
  caption,
  createdAt,
  comments,
  likes,
  title: Title,
  likeButton: LikeButton,
  savedButton: SavedButton,
}: Post & {
  title: () => JSX.Element
  likeButton: () => JSX.Element
  savedButton: () => JSX.Element
}) {
  return (
    <article className="overflow-hidden bg-white border border-gray-300 rounded-md">
      <header className="grid grid-cols-[32px,1fr,32px] items-center px-4 py-2">
        <div className="">
          <img
            src={placeholder} /* replace src  */
            alt="random"
            className="rounded-full object-cover aspect-square"
          />
        </div>
        <p className="px-5 text-sm">
          <Title />
        </p>
        <div>
          <FeedOptions id={userid} />
        </div>
      </header>
      <div className="grid place-items-center aspect-square border">
        <Picture
          path={mediaPath}
          className="aspect-square object-contain"
          alt="random"
        />
      </div>
      <footer className="p-4 text-sm space-y-3">
        <div className="flex gap-4 items-center">
          <LikeButton />
          <IconButton>{commentIcon}</IconButton>
          <IconButton>{sharePostIcon}</IconButton>
          <SavedButton />
        </div>
        <div className="space-y-2">
          <p>{likes.length} likes</p>
          <p className="font-semibold">8,256 views</p>
          <p>
            <Title />
            <span>{caption}</span>
          </p>
          <p>
            <button className=" text-gray-500">
              {comments.length > 0
                ? `view all ${comments.length} comments`
                : 'No comment'}{' '}
            </button>
          </p>
          <p className="text-xs text-gray-500">
            {createdAt?.toDate().toDateString()}
          </p>
        </div>
      </footer>
    </article>
  )
}
