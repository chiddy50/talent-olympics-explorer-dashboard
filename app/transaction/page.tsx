import PageTitle from '@/components/PageTitle'
import TransactionComponent from '@/components/Transaction/TransactionComponent'
import { ModeToggle } from '@/components/mode-toggle'
import { StackIcon } from '@radix-ui/react-icons'

function TransactionPage() {
  return (
    <div className="flex flex-1 flex-col gap-5  w-full">      

      <div className='max-h-[600px] overflow-y-auto'>
        <TransactionComponent />
      </div>
    </div>
  )
}

export default TransactionPage
