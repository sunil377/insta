import {
  Modal,
  ModalContent,
  ModalDismissButton,
  ModalOpenIconButton,
} from 'components/modal'
import { Button, IconButton } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { useActionFollowing } from 'feature/Feeds/hooks'
import { Fragment } from 'react'
import { User } from 'services/user'
import { followingIcon, optionsIcon } from './assets/svg'
import Main from './Main'
import ProfilePic from './ProfilePic'

export default function MyProfile({
  username,
  posts,
  profile,
  fullName,
  followers,
  following,
  id,
}: User) {
  const auth = useSafeAuthContext()

  const isSelf = id === auth.id
  const postsCount = posts.length
  const followersCount = followers.length
  const followingsCount = following.length

  const infosAboutPost = [
    { name: 'posts', count: postsCount },
    {
      name: 'followers',
      count: followersCount,
    },
    {
      name: 'followings',
      count: followingsCount,
    },
  ]

  return (
    <Fragment>
      <section className="py-4 md:py-10 text-gray-normal grid sm:grid-cols-12 gap-y-5">
        <div className="sm:col-span-9 md:col-span-10 px-4 md:px-0">
          <div className="grid grid-cols-4 gap-y-2">
            <div className="col-span-1 md:row-span-2 md:col-span-2">
              <div className="grid place-items-center">
                {profile && (
                  <ProfilePic imageURL={profile} username={username} />
                )}
              </div>
            </div>
            <div className="col-span-3 max-w-[16rem] md:col-span-2 md:max-w-[32rem]">
              <div className="grid pl-4 md:pl-0 grid-cols-4 md:grid-cols-6 gap-2">
                <div className="col-span-4 md:col-span-6">
                  <div className="grid md:flex gap-2 md:gap-4">
                    <div className="col-span-3 md:order-1">
                      <h1 className="text-big font-thin">{username}</h1>
                    </div>
                    {isSelf ? (
                      <Fragment>
                        <div className="col-span-1 md:order-3">
                          <IconButton>{optionsIcon}</IconButton>
                        </div>
                        <div className="col-span-4 md:col-span-2 md:order-2">
                          <button className="border block w-full md:px-4 border-gray-separator rounded font-semibold text-sm py-1">
                            Edit Profile
                          </button>
                        </div>
                      </Fragment>
                    ) : (
                      <div className="col-span-1 md:order-2">
                        <FollowingButton followerId={id} username={username} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-6 hidden md:block md:order-4">
                  <div className="flex gap-x-4 py-4">
                    {infosAboutPost.map(item => (
                      <button key={item.name}>
                        <span className="font-semibold">{item.count}</span>
                        <span className="ml-1.5 text-gray-900">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 text-sm md:text-base md:col-span-2">
              <h4 className="font-semibold capitalize text-gray-900">
                {fullName}
              </h4>
              <p>Genuine and funny that's what i think anyway...</p>
              <p>You naver wrong to do the right thing...</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 text-sm md:hidden">
          <div className="grid grid-cols-3 border place-items-center border-gray-separator py-2">
            {infosAboutPost.map(item => (
              <button
                className="inline-grid place-items-center"
                key={item.name}
              >
                <span className="font-semibold ">{item.count}</span>
                <span className="text-gray-light">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Main id={id} />
    </Fragment>
  )
}

function FollowingButton({
  followerId,
  username,
}: {
  followerId: string
  username: string
}) {
  const { isFollowings, toggleFollowing } = useActionFollowing(followerId)

  return !isFollowings ? (
    <Button onClick={toggleFollowing}>Follow</Button>
  ) : (
    <Modal>
      <ModalOpenIconButton className="border rounded px-6 py-1.5">
        {followingIcon}
      </ModalOpenIconButton>
      <ModalContent className="min-w-[300px]">
        <div className="text-center py-5">
          <h1>unfollow @{username} ?</h1>
        </div>
        <ul className="text-sm">
          <li>
            <Button
              className="border-t text-red-500 block w-full text-center py-2.5"
              onClick={toggleFollowing}
            >
              unFollow
            </Button>
          </li>
          <li>
            <ModalDismissButton className="border-t block w-full text-center py-2.5">
              Cancel
            </ModalDismissButton>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  )
}
