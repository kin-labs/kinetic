import { Button } from '@saas-ui/react'

export function WebToolboxUiExplorerLink({ href }: { href?: string }) {
  return (
    <Button as={'a'} href={href} size="lg" target="_blank" variant="outline">
      View on Explorer
    </Button>
  )
}
