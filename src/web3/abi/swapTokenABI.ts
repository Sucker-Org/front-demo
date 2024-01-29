export const TOKEN_SWAP_ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_user',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: '_fromTokenAddr',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: '_toTokenAddr',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_fromAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_toAmount',
          type: 'uint256'
        }
      ],
      name: 'TokenSwapped',
      type: 'event'
    },
    {
      inputs: [],
      name: 'getCNHDPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getHDCPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenType_',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'cost_',
          type: 'uint256'
        }
      ],
      name: 'estimate',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenType_',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'amount_',
          type: 'uint256'
        }
      ],
      name: 'swap',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount_',
          type: 'uint256'
        }
      ],
      name: 'swapForCND',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newCNHDPrice_',
          type: 'uint256'
        }
      ],
      name: 'updateCNHDPrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newHDCPrice_',
          type: 'uint256'
        }
      ],
      name: 'updateHDCPrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr_',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'auth',
          type: 'bool'
        }
      ],
      name: 'setAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];