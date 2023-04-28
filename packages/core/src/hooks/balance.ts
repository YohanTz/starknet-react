import { useContractRead } from './call'
import { ethByChainId, useStarknet } from '..'

/** Arguments for `useBalance`. */
export interface UseBalanceArgs {
  /** Address to fetch balance for */
  address: string
  /** Address for ERC-20 token */
  token?: string
  /** Refresh date at every block. */
  watch?: boolean
}

/** Value returned for `useBalance` */
export interface UseBalanceResult {
  /** Value returned from call. */
  //   data?: {
  //     decimals: number
  //     formatted: string
  //     symbol: string
  //     // TODO: value: BigNumber
  //   }
  /** Value returned from call. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Array<any>
  /** Error when performing call. */
  error?: unknown
  isIdle: boolean
  /** True when preforming call */
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  /** False when performing call. */
  isError: boolean
  isFetched: boolean
  isFetchedAfterMount: boolean
  /** True when preforming call */
  isRefetching: boolean
  /** Manually trigger refresh of data. */
  refetch: () => void
  status: 'idle' | 'error' | 'loading' | 'success'
}

/**
 * Hook to to fetch balance information for Ethereum or ERC-20 tokens
 *
 * @remarks
 *
 * You can specify blabla
 *
 * @example
 * This example shows how to fetch the user ERC-20 balance.
 * ```tsx
 * function Component() {
 *   const { address } = useAccount()
 *   const { data, isLoading, error, refetch } = useBalance({
 *     address,
 *     watch: false
 *   })
 *
 *   if (isLoading) return <span>Loading...</span>
 *   if (error) return <span>Error: {error}</span>
 *
 *   return (
 *     <div>
 *       <button onClick={refetch}>Refetch</button>
 *       <p>Balance: {JSON.stringify(data)}</p>
 *     </div>
 *   )
 * }
 * ```
 */

const ethAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

export function useBalance({ address, token, watch = false }: UseBalanceArgs): UseBalanceResult {
  const { library } = useStarknet()

  return useContractRead({
    address: token ?? ethByChainId(library.chainId),
    abi: compiledErc20.abi,
    functionName: 'balanceOf',
    args: [address],
    watch,
  })
}
