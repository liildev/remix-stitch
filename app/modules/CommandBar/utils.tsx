import { useRef } from 'react'
import { useNavigate } from "@remix-run/react"
import { useToast } from '~/context'
import { Lottie } from '~/components'
import { ROUTES } from '~/constants'
import { LottieRef } from 'lottie-react'
import {
  copyLinkIcon,
  emailIcon,
  sourceIcon,
  aboutIcon,
  homeIcon,
  projectsIcon,
  reminderIcon,
} from '~/assets'


export const useCommandBar = () => {
  const navigate = useNavigate()
  const copyLinkRef: LottieRef = useRef(null);
  const emailRef: LottieRef = useRef(null)
  const sourceRef: LottieRef = useRef(null)
  const homeRef: LottieRef = useRef(null)
  const aboutRef: LottieRef = useRef(null)
  const projectsRef: LottieRef = useRef(null)
  const reminderRef: LottieRef = useRef(null)
  const { setToast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setToast(
      'Copied :D',
      'You can now share it with anyone.',
      true,
      true
    )
  }

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      // icon: <Lottie lottieRef={copyLinkRef} animationData={copyLinkIcon} />,
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => navigate(ROUTES.contact),
      // icon: <Lottie lottieRef={emailRef} animationData={emailIcon} />,
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/liildev/portfolio/tree/master', '_blank'),
      // icon: <Lottie lottieRef={sourceRef} animationData={sourceIcon} />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => navigate(ROUTES.home),
      // icon: <Lottie lottieRef={homeRef} animationData={homeIcon} />,
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => navigate(ROUTES.about),
      // icon: <Lottie lottieRef={aboutRef} animationData={aboutIcon} />,
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => navigate(ROUTES.projects),
      // icon: <Lottie lottieRef={projectsRef} animationData={projectsIcon} />,
    },
    {
      id: 'reminder',
      name: 'Reminder',
      shortcut: ['g', 'r'],
      keywords: 'go-reminder',
      section: 'Go To',
      perform: () => navigate(ROUTES.reminder),
      // icon: <Lottie lottieRef={reminderRef} animationData={reminderIcon} />,
    },
  ]

  return { actions }
}
