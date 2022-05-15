import {
  Alert,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Cluster, ClusterToken, ClusterTokenInput, useAddClusterMintMutation } from '@mogami/shared/util/admin-sdk'
import React, { useState } from 'react'
import { AdminClusterUiMintForm } from './admin-cluster-ui-mint-form'
import { AdminClusterUiTokenConfirm } from './admin-cluster-ui-token-confirm'
import { AdminClusterUiTokenResults } from './admin-cluster-ui-token-results'

export interface AdminClusterUiMintModalProps {
  cluster: Cluster
}

export function AdminClusterUiMintModal({ cluster }: AdminClusterUiMintModalProps) {
  const toast = useToast()
  const defaultInput: ClusterTokenInput = { type: cluster.type!, address: '', name: '', symbol: '' }
  const [, addClusterMint] = useAddClusterMintMutation()

  const [input, setInput] = useState<ClusterTokenInput>({ ...defaultInput })
  const [selected, setSelected] = useState<ClusterToken | null>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (!cluster) {
    return <Alert>No cluster found.</Alert>
  }

  const existing: string[] = cluster?.mints
    ?.filter((mint) => !!mint.address)
    ?.map(({ address }) => address!) as string[]

  function searchMint(input: Partial<ClusterTokenInput>) {
    setInput({
      type: cluster.type!,
      address: input.address,
      symbol: input.symbol,
      name: input.name,
    })
    return
  }
  const confirmToken = async (token: ClusterToken) => {
    try {
      const result = await addClusterMint({
        input: {
          address: token.address!,
          clusterId: cluster.id!,
          name: token.name!,
          symbol: token.symbol!,
        },
      })
      toast({
        status: 'success',
        title: 'Mint Added',
      })
      onClose()
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Something went wrong :(',
        description: error?.toString(),
      })
    }
  }
  return (
    <Box>
      <Button size={'lg'} onClick={onOpen}>
        Add Mint
      </Button>

      <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Mint to {cluster?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="full">
              {selected ? (
                <Box>
                  <AdminClusterUiTokenConfirm
                    clear={() => setSelected(null)}
                    token={selected}
                    confirmToken={confirmToken}
                  />
                </Box>
              ) : input?.address || input?.name || input?.symbol ? (
                <AdminClusterUiTokenResults
                  input={input}
                  existing={existing || []}
                  clear={() => setInput(defaultInput)}
                  selectToken={(token) => setSelected(token)}
                />
              ) : (
                <AdminClusterUiMintForm input={input} onSubmit={searchMint} />
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <br />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
