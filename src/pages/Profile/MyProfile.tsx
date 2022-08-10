import { Dialog, Transition } from '@headlessui/react'
import { ReactComponent as FollowingSvg } from 'assets/svg/following.svg'
import { ReactComponent as OptionSvg } from 'assets/svg/option.svg'
import { Button, IconButton } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { useModal } from 'hooks/hooks'
import { useActionFollowing } from 'hooks/useAction'
import { Fragment } from 'react'
import { User } from 'services/user'
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
      <section className="grid gap-y-5 py-4 text-gray-normal sm:grid-cols-12 md:py-10">
        <div className="px-4 sm:col-span-9 md:col-span-10 md:px-0">
          <div className="grid grid-cols-4 gap-y-2">
            <div className="col-span-1 md:col-span-2 md:row-span-2">
              <div className="grid place-items-center">
                <ProfilePic imageURL={profile} username={username} />
              </div>
            </div>
            <div className="col-span-3 max-w-[16rem] md:col-span-2 md:max-w-[32rem]">
              <div className="grid grid-cols-4 gap-2 pl-4 md:grid-cols-6 md:pl-0">
                <div className="col-span-4 md:col-span-6">
                  <div className="grid gap-2 md:flex md:gap-4">
                    <div className="col-span-3 md:order-1">
                      <h1 className="text-big font-thin">{username}</h1>
                    </div>
                    {isSelf ? (
                      <Fragment>
                        <div className="col-span-1 md:order-3">
                          <IconButton>
                            <OptionSvg />
                          </IconButton>
                        </div>
                        <div className="col-span-4 md:order-2 md:col-span-2">
                          <button className="block w-full rounded border border-gray-separator py-1 text-sm font-semibold md:px-4">
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
                <div className="hidden md:order-4 md:col-span-6 md:block">
                  <div className="flex gap-x-4 py-4">
                    {infosAboutPost.map(item => (
                      <button key={item.name}>
                        <span className="font-semibold">{item.count}</span>
                        <span className="ml-1.5 text-gray-900">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 text-sm md:col-span-2 md:text-base">
              <h4 className="font-semibold capitalize text-gray-900">{fullName}</h4>
              <p>Genuine and funny that's what i think anyway...</p>
              <p>You naver wrong to do the right thing...</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 text-sm md:hidden">
          <div className="grid grid-cols-3 place-items-center border border-gray-separator py-2">
            {infosAboutPost.map(item => (
              <button type="button" className="inline-grid place-items-center" key={item.name}>
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

function FollowingButton({ followerId, username }: { followerId: string; username: string }) {
  const { isFollowings, toggleFollowing } = useActionFollowing(followerId)
  const { isOpen, openModal, closeModal } = useModal()

  return !isFollowings ? (
    <Button onClick={toggleFollowing}>Follow</Button>
  ) : (
    <>
      <button
        type="button"
        title="following"
        onClick={openModal}
        className="rounded border px-6 py-1.5"
      >
        <FollowingSvg />
      </button>
      <Transition appear show={isOpen}>
        <Dialog onClose={closeModal} className="min-w-[300px]">
          <div className="py-5 text-center">
            <h1>unfollow @{username} ?</h1>
          </div>
          <ul className="text-sm">
            <li>
              <Button
                className="block w-full border-t py-2.5 text-center text-red-500"
                onClick={toggleFollowing}
              >
                unFollow
              </Button>
            </li>
            <li>
              <button
                type="button"
                onClick={closeModal}
                className="block w-full border-t py-2.5 text-center"
              >
                Cancel
              </button>
            </li>
          </ul>
        </Dialog>
      </Transition>
    </>
  )
}
