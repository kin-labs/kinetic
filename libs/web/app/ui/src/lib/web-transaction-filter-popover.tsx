import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { PropsWithChildren, ReactElement } from 'react'

export function WebTransactionFilterPopover({
  active,
  children,
  icon,
  label,
  onClear,
  onSave,
}: PropsWithChildren<{
  active?: boolean
  icon: ReactElement
  label: string
  onClear: () => void
  onSave: () => void
}>) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={active ? 'solid' : 'outline'} leftIcon={icon} colorScheme={active ? 'primary' : 'gray'}>
          {label}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="full" minWidth="350px">
          <PopoverArrow />
          <PopoverHeader>{label}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
          <PopoverFooter>
            <Flex justifyContent={'space-between'}>
              <Button onClick={onClear} variant="link">
                Clear
              </Button>
              <Button onClick={onSave} colorScheme="primary">
                Save
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
