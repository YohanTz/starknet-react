import {
  Abi,
  AccountInterface,
  Call,
  InvocationsDetails,
  InvokeFunctionResponse,
} from "starknet";

import { UseMutationProps, UseMutationResult, useMutation } from "~/query";

import { useAccount } from "./useAccount";

/** Arguments for `useContractWrite`. */
export type ContractWriteVariables = {
  /** List of smart contract calls to execute. */
  calls?: Call[];
  /** Contract ABIs for better displaying. */
  abis?: Abi[];
  /** Transaction options. */
  options?: InvocationsDetails;
};

export type UseContractWriteProps = ContractWriteVariables &
  UseMutationProps<InvokeFunctionResponse, Error, ContractWriteVariables>;

type MutationResult = UseMutationResult<
  InvokeFunctionResponse,
  Error,
  ContractWriteVariables
>;

export type UseContractWriteResult = Omit<
  MutationResult,
  "mutate" | "mutateAsync"
> & {
  /** Execute the calls. */
  write: MutationResult["mutate"];
  /** Execute the calls. */
  writeAsync: MutationResult["mutateAsync"];
};

/**
 * Hook to perform a Starknet multicall.
 *
 * @remarks
 *
 * Multicalls are used to submit multiple transactions in a single
 * call to improve user experience.
 */
export function useContractWrite({
  calls,
  abis,
  options,
  ...props
}: UseContractWriteProps): UseContractWriteResult {
  const { account } = useAccount();
  const {
    mutate,
    mutateAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    isPaused,
    reset,
    status,
    variables,
  } = useMutation({
    mutationKey: mutationKey({ account, calls, abis, options }),
    mutationFn: mutationFn({ account, calls, abis, options }),
    ...props,
  });

  return {
    write: mutate,
    writeAsync: mutateAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    isPaused,
    reset,
    status,
    variables,
  };
}

function mutationKey({
  account,
  calls,
  abis,
  options,
}: {
  account?: AccountInterface;
  calls?: Call[];
  abis?: Abi[];
  options?: InvocationsDetails;
}) {
  return [{ entity: "contractWrite", account, calls, abis, options }] as const;
}

function mutationFn({
  account,
  calls,
  abis,
  options,
}: {
  account?: AccountInterface;
  calls?: Call[];
  abis?: Abi[];
  options?: InvocationsDetails;
}) {
  return async function () {
    if (!account) throw new Error("account is required");
    if (!calls || calls.length === 0) throw new Error("calls are required");
    return await account?.execute(calls, abis, options);
  };
}
