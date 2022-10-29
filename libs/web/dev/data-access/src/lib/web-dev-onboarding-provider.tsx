import { createContext, ReactNode, useContext, useState } from 'react'
import { IconType } from 'react-icons'
import {
  MdAppRegistration,
  MdApproval,
  MdAttachMoney,
  MdEmail,
  MdHelp,
  MdInfo,
  MdSend,
  MdWrapText,
} from 'react-icons/md'

export interface OnboardingStep {
  done: boolean
  icon: IconType
  label: string
  description: string
  cta: string
}

export interface WebDevOnboardingProviderContext {
  current: OnboardingStep
  done: OnboardingStep[]
  setCurrent: (step: OnboardingStep) => void
  setDone: (step: OnboardingStep) => void
  steps: OnboardingStep[]
}

const WebDevOnboardingContext = createContext<WebDevOnboardingProviderContext>({} as WebDevOnboardingProviderContext)

const INITIAL_STEPS: OnboardingStep[] = [
  {
    label: 'Create Application',
    description: 'Create your application to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdAppRegistration,
    done: true,
    cta: 'Create Application',
  },
  {
    label: 'Make transaction on devnet',
    description: 'Make transaction on devnet with your appIndex to get it tracked by the KRE processor.',
    icon: MdSend,
    done: false,
    cta: 'Make transaction on devnet',
  },
  {
    label: 'Provide Application info',
    description: 'Provide Application info to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdWrapText,
    done: false,
    cta: 'Provide Application info',
  },
  {
    label: 'Provide KRE details',
    description: 'Provide KRE details to receive the rewards.',
    icon: MdInfo,
    done: false,
    cta: 'Provide KRE details',
  },
  {
    label: 'Apply for KRE',
    description: 'Apply for KRE to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdApproval,
    done: false,
    cta: 'Apply for KRE',
  },
  {
    label: 'Sign up for our newsletter',
    description: 'Apply for KRE to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdEmail,
    done: true,
    cta: 'Sign up for our newsletter',
  },
  {
    label: 'Get support on Discord',
    description: 'Apply for KRE to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdHelp,
    done: false,
    cta: 'Get support on Discord',
  },
  {
    label: 'Apply for a Grant',
    description: 'Apply for a Grant to receive the appIndex used to tag your transactions and get rewarded.',
    icon: MdAttachMoney,
    done: false,
    cta: 'Apply for a Grant',
  },
]

function WebDevOnboardingProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<OnboardingStep[]>(INITIAL_STEPS)
  const [current, setCurrent] = useState<OnboardingStep>(steps[0])

  const setDone = (step: OnboardingStep) => {
    setSteps(
      steps.map((item) => {
        if (step !== item) return item
        item.done = true
        return item
      }),
    )
  }

  const value: WebDevOnboardingProviderContext = {
    current,
    done: steps.filter((item) => item.done),
    setCurrent,
    setDone,
    steps,
  }

  return <WebDevOnboardingContext.Provider value={value}>{children}</WebDevOnboardingContext.Provider>
}

const useWebDevOnboarding = () => useContext(WebDevOnboardingContext)

export { WebDevOnboardingProvider, useWebDevOnboarding }
