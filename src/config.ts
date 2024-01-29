// 生产环境
export const CONTRACT_CONFIG = {
    USDT_CONTRACT_ADDRESS: '0x55d398326f99059fF775485246999027B3197955',
    SWAP_TOKEN_ADDRESS: '0x0cE96Cb7a4A156819BF76943D8d5ef1076B1daF2',
    CND_ADDRESS: '0xc5FEe9F1267Fb36350525C9d0D8Aa09110D4d91d',
    CNHD_ADDRESS: '0x80c651486660e5b529e29b00086292185929cb1f',
    HDC_ADDRESS: '0x0d19c4d326c94f588b55f1811e489a3a924e4acf',
    Decimals: 18,
    CHAIN_ID: 56,
    CHAIN_ID_HEX: '0x38',
    NETWORK_NAME: 'Binance Smart Chain',
    Symbol: 'BNB',
    RPC_URL: 'https://bsc-dataseed1.binance.org/',
    EXPLORER_URL: 'https://bscscan.com/'
}

// 0x0FD1261521B8EfAcbC7087e9f01823A3FC6ec6F7

// 测试网
/* export const CONTRACT_CONFIG = {
    USDT_CONTRACT_ADDRESS: '0x766e9716cA866aFfcFE3e2E8a445a2D35B734Bc6',
    SWAP_TOKEN_ADDRESS: '0xd00578DafDC4e604D1Ce2a549b27eF3B18fDd567',
    CND_ADDRESS: '0xbA74449CB311466dB4Be6AaC1E6846c18B845D95',
    CNHD_ADDRESS: '0x6e712A4d55e2FF618F112AfB62a64972161D77e6',
    HDC_ADDRESS: '0xb2BA8B9751397fFDF4F1A3137803977Fc37819Ca',
    Decimals: 18,
    CHAIN_ID: 97,  //Mainnet 56
    CHAIN_ID_HEX: '0x61', //Mainnet '0x38'
    NETWORK_NAME: 'Binance Smart Chain Testnet',
    Symbol: 'tBNB',
    RPC_URL: 'https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
    EXPLORER_URL: 'https://testnet-explorer.bnbchain.org/'
} */

export const PayTypeMap = {
    usdt: {
        name: 'USDT',
        icon: 'tether-usdt-logo'
    },
    cnd: {
        name: 'CND',
        icon: 'tether-usdt-logo'
    },
}
