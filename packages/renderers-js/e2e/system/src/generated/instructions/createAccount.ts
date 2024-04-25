/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { BASE_ACCOUNT_SIZE } from '@solana/accounts';
import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
} from '@solana/codecs';
import {
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { SYSTEM_PROGRAM_ADDRESS } from '../programs';
import {
  IInstructionWithByteDelta,
  ResolvedAccount,
  getAccountMetaFactory,
} from '../shared';

export type CreateAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount> &
            IAccountSignerMeta<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts,
    ]
  >;

export type CreateAccountInstructionData = {
  discriminator: number;
  lamports: bigint;
  space: bigint;
  programAddress: Address;
};

export type CreateAccountInstructionDataArgs = {
  lamports: number | bigint;
  space: number | bigint;
  programAddress: Address;
};

export function getCreateAccountInstructionDataEncoder(): Encoder<CreateAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU32Encoder()],
      ['lamports', getU64Encoder()],
      ['space', getU64Encoder()],
      ['programAddress', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 0 })
  );
}

export function getCreateAccountInstructionDataDecoder(): Decoder<CreateAccountInstructionData> {
  return getStructDecoder([
    ['discriminator', getU32Decoder()],
    ['lamports', getU64Decoder()],
    ['space', getU64Decoder()],
    ['programAddress', getAddressDecoder()],
  ]);
}

export function getCreateAccountInstructionDataCodec(): Codec<
  CreateAccountInstructionDataArgs,
  CreateAccountInstructionData
> {
  return combineCodec(
    getCreateAccountInstructionDataEncoder(),
    getCreateAccountInstructionDataDecoder()
  );
}

export type CreateAccountInput<
  TAccountPayer extends string = string,
  TAccountNewAccount extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  newAccount: TransactionSigner<TAccountNewAccount>;
  lamports: CreateAccountInstructionDataArgs['lamports'];
  space: CreateAccountInstructionDataArgs['space'];
  programAddress: CreateAccountInstructionDataArgs['programAddress'];
};

export function getCreateAccountInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
>(
  input: CreateAccountInput<TAccountPayer, TAccountNewAccount>
): CreateAccountInstruction<
  typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountPayer,
  TAccountNewAccount
> &
  IInstructionWithByteDelta {
  // Program address.
  const programAddress = SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    newAccount: { value: input.newAccount ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Bytes created or reallocated by the instruction.
  const byteDelta: number = [Number(args.space) + BASE_ACCOUNT_SIZE].reduce(
    (a, b) => a + b,
    0
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.newAccount),
    ],
    programAddress,
    data: getCreateAccountInstructionDataEncoder().encode(
      args as CreateAccountInstructionDataArgs
    ),
  } as CreateAccountInstruction<
    typeof SYSTEM_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountNewAccount
  >;

  return Object.freeze({ ...instruction, byteDelta });
}

export type ParsedCreateAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    newAccount: TAccountMetas[1];
  };
  data: CreateAccountInstructionData;
};

export function parseCreateAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      payer: getNextAccount(),
      newAccount: getNextAccount(),
    },
    data: getCreateAccountInstructionDataDecoder().decode(instruction.data),
  };
}
