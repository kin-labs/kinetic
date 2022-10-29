import {
  Box,
  Button,
  Flex,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useWebDevOnboarding } from '@kin-kinetic/web/dev/data-access'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { MdCheckCircle } from 'react-icons/md'

export function WebDevFeatureOnboarding() {
  const mainBg = useColorModeValue('gray.200', 'gray.800')
  const sideBg = useColorModeValue('gray.100', 'gray.700')
  const iconColor = useColorModeValue('gray.500', 'gray.400')
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const { current, done, setCurrent, setDone, steps } = useWebDevOnboarding()

  const pct = Math.round(done.length * 100) / steps.length

  return (
    <WebUiPage>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor={mainBg}>
        <Box p={6} bg={mainBg} borderBottomWidth="1px" borderBottomColor={borderColor}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                Get the most out of your Application
              </Text>
            </Box>
            <Flex alignItems={'center'}>
              <Text fontSize={'xl'} mr={'4'}>
                {done.length} / {steps.length}
              </Text>
              <Box width={100}>
                <Progress value={pct} colorScheme="primary" />
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Flex>
          <Box width={350}>
            {steps.map((step) => (
              <Flex
                as="button"
                display={'flex'}
                w={'full'}
                p={6}
                onClick={() => setCurrent(step)}
                key={step.label}
                bg={step === current ? mainBg : sideBg}
                borderColor={borderColor}
                borderLeftColor={step === current ? 'primary.500' : sideBg}
                borderLeftWidth="4px"
                borderRightWidth={step === current ? 0 : '1px'}
                borderBottomWidth="1px"
                alignItems="center"
              >
                <Icon
                  as={step.done ? MdCheckCircle : step.icon}
                  color={step.done ? 'green.400' : iconColor}
                  h={8}
                  w={8}
                  mr={'4'}
                />
                <Text fontSize={'xl'}>{step.label}</Text>
              </Flex>
            ))}
          </Box>
          <Flex
            alignItems={'center'}
            bg={mainBg}
            borderColor={'gray.800'}
            direction={'row'}
            flexGrow={1}
            justifyContent={'center'}
          >
            <Flex direction={'column'} width={450} alignItems={'center'}>
              <Icon as={current.icon} h={12} w={12} mb={'8'} color={iconColor} />
              <Text fontSize={'3xl'} fontWeight={'bold'}>
                {current.label}
              </Text>
              <Text fontSize={'xl'} textAlign={'center'} color={iconColor}>
                {current.description}
              </Text>
              <Box mb={8}></Box>

              <Button
                size="lg"
                variant={'solid'}
                colorScheme={current.done ? 'gray' : 'primary'}
                onClick={() => setDone(current)}
              >
                {current.cta}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </WebUiPage>
  )
}

export function SliderCounter({
  min,
  max,
  setValue,
  value,
}: {
  min: number
  max: number
  setValue: (num: number) => void
  value: number
}) {
  return (
    <Stack direction="row" spacing={6}>
      <Slider focusThumbOnChange={false} value={value} onChange={(val) => setValue(val)} min={min} max={max}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <NumberInput value={value} precision={0} step={100} onChange={(val) => setValue(Number(val))}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  )
}
