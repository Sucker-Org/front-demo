import { ethers, providers } from "ethers";//ethers.js v5.7.2
import { USDT_ABI, TOKEN_SWAP_ABI, CND_ABI } from '@/abi/contractABI';
import BigNumber from 'bignumber.js';
import { CONTRACT_CONFIG } from '@/config';
import { WalletType } from "@/store/WalletStore";
import { RootStore } from "@/store";

const { walletStore } = RootStore;
const isMobile = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	return userAgent.match(/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i) !== null;
}
const isWechat = () => {
	var userAgent = navigator.userAgent.toLowerCase();
	return userAgent.indexOf('micromessenger') !== -1;
}
const isTokenPocket = () => {
	var userAgent = navigator.userAgent.toLowerCase();
	return userAgent.indexOf('tokenpocket') !== -1;
}

const isMetaMask = () => {
	var userAgent = navigator.userAgent.toLowerCase();
	return userAgent.indexOf('metamask') !== -1;
}

class WalletMeta {
	private _provider: providers.Web3Provider;
	constructor() {
		if (window.ethereum) {
			this._provider = new providers.Web3Provider(window.ethereum);
			console.log('this._provider', this._provider.provider)
		} else {
			console.log("Please install an Ethereum wallet extension like TokenPocket.");
			walletStore.setLoading(false);
		}
	}

	async isWalletInstalled(): Promise<boolean> {
		if (window.ethereum && window.ethereum.isTokenPocket !== undefined || isTokenPocket() || isMetaMask()) {
			return true;
		} else {

			if (isMobile()) {
				if (isWechat()) {
					alert('复制页面地址在默认浏览器中打开');
					return false;
				}
				const params = { "url": window.location.href, "chain": CONTRACT_CONFIG.NETWORK_NAME };
				const urlToOpen = `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
				if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
					window.open(urlToOpen, '_self');
					
					setTimeout(() => {
						window.open('https://www.tokenpocket.pro/', '_blank');
					}, 1000);

					return false;
				} else if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					const userAgent = navigator.userAgent;
					const version = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)[1];
					if (Number(version) > 14) {
						window.open(urlToOpen, '_self');
						return false;
					} else {
						window.location.href = 'itms-apps://itunes.apple.com/app/id6444625622?action=write-review';
						return false;
					}
				} else {
					window.open('https://www.tokenpocket.pro/', '_blank');
					return false;
				}
			} else {
				window.open('https://www.tokenpocket.pro/', '_blank');
				return false;
			}
		}
	}

	async getAll(address: string) {
		try {
			const balances = await Promise.all([
				this.getBnbBalance(address),
				this.getUsdtBalance(address),
				this.getCndBalance(address),
				this.getCNHDPrice(),
				this.getHDCPrice()
			]);

			const [bnbBalance, usdtBalance, cndBalance, CNHDPrice, HDCPrice] = balances;
			localStorage.setItem('walletAddress', address);
			console.table({ address, bnbBalance, usdtBalance, cndBalance, CNHDPrice, HDCPrice });
			return { address, bnbBalance, usdtBalance, cndBalance, CNHDPrice, HDCPrice };
		} catch (error) {
			console.log('getAll',error)
			throw error;
		}
	}

	async connectTokenPocket(): Promise<false | WalletType> {
		const isInstalled = await this.isWalletInstalled();
		console.log('this.isWalletInstalled()', isInstalled)
		if (!isInstalled) {
			return false;
		} else {
			const chainId = await this.getChainId();
			if (chainId !== CONTRACT_CONFIG.CHAIN_ID) {
				throw new Error('请切换到正确的网络');
			}
			try {
				const [address] = await this._provider.send("eth_requestAccounts", []);
				if (!address) throw new Error("用户拒绝访问账户");
				try {
					return this.getAll(address);
				} catch (error) {
					console.log('connectTokenPocket error', error.message)
					throw new Error(error.message)
				}
			} catch (error) {
				console.error("Error requesting accounts:", error);
				throw new Error('连接钱包失败，请稍后重试或联系支持。');
			}
		}
	}

	async init() {
		try {
			const address = (this._provider.provider as any).selectedAddress;
			console.log('address', address)
			if (!address) return false;
			const chainId = await this.getChainId();
			if (chainId !== CONTRACT_CONFIG.CHAIN_ID) {
				return false;
			}
			return this.getAll(address);
		} catch (error) {
			console.log('init error', error.message)
			throw new Error('连接钱包失败，请稍后重试或联系支持。');
		}
	}

	async getBalance(address: string, isBnb: boolean, contractAddress?: string, abi?: any): Promise<string> {
		try {
			const contract = isBnb
				? undefined // For BNB, no specific contract is needed
				: new ethers.Contract(contractAddress, abi, this._provider);

			const balance = isBnb
				? await this._provider.getBalance(address)
				: await contract.balanceOf(address);

			return ethers.utils.formatEther(balance);
		} catch (error) {
			console.log(error.message)
			throw new Error(`获取余额失败，请稍后重试或联系支持。${isBnb ? 'BNB' : 'Token'}`);
		}
	}

	async updateBalance(address: string) {
		if (!address) {
			localStorage.removeItem('walletAddress');
			return { address: '', bnbBalance: '0', usdtBalance: '0', cndBalance: '0' };
		}
		try {
			const balances = await Promise.all([
				this.getBnbBalance(address),
				this.getUsdtBalance(address),
				this.getCndBalance(address)
			]);
			localStorage.setItem('walletAddress', address);
			const [bnbBalance, usdtBalance, cndBalance] = balances;
			console.table({ address, bnbBalance, usdtBalance, cndBalance });
			return { address, bnbBalance, usdtBalance, cndBalance };
		} catch (error) {
			console.log(error.message)
			throw error;
		}
	}

	async getBnbBalance(address: string): Promise<string> {
		return this.getBalance(address, true);
	}

	async getUsdtBalance(address: string): Promise<string> {
		const contract = new ethers.Contract(CONTRACT_CONFIG.USDT_CONTRACT_ADDRESS, USDT_ABI, this._provider);
		const balance = await contract.balanceOf(address);
		return ethers.utils.formatEther(balance);
	}

	async getCndBalance(address: string): Promise<string> {
		return this.getBalance(address, false, CONTRACT_CONFIG.CND_ADDRESS, CND_ABI);
	}

	async getCNHDPrice(): Promise<string> {
		return this.getPrice(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, TOKEN_SWAP_ABI, 'CNHD');
	}

	async getHDCPrice(): Promise<string> {
		return this.getPrice(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, TOKEN_SWAP_ABI, 'HDC');
	}

	async getPrice(contractAddress: string, abi: any, token: string): Promise<string> {
		try {
			const signer = this._provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			return ethers.utils.formatUnits(await contract[`get${token}Price`](), 18);
		} catch (error) {
			console.log(error.message)
			throw new Error(`获取 ${token} 价格失败，请稍后重试或联系支持。`);
		}
	}

	async getChainId() {
		if (!this._provider) {
			console.log("Provider is not defined. Please install an Ethereum wallet extension like MetaMask.");
			return false;
		}
		const netWork = await this._provider.getNetwork();
		return netWork.chainId;
	}

	async addNetwork() {
		try {
			await window.ethereum.request({
				method: 'wallet_addEthereumChain',
				params: [{
					chainId: CONTRACT_CONFIG.CHAIN_ID_HEX,
					chainName: CONTRACT_CONFIG.NETWORK_NAME,
					nativeCurrency: {
						name: CONTRACT_CONFIG.Symbol,
						symbol: CONTRACT_CONFIG.Symbol,
						decimals: CONTRACT_CONFIG.Decimals
					},
					rpcUrls: [CONTRACT_CONFIG.RPC_URL],
					blockExplorerUrls: [CONTRACT_CONFIG.EXPLORER_URL]
				}],
			});
			window.location.reload();
		} catch (addError) {
			console.log(addError.message);
			throw new Error('添加网络失败。');
		}
	}

	async switchNetwork(): Promise<boolean> {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: CONTRACT_CONFIG.CHAIN_ID_HEX }],
			});
			console.log('getChainId=============', this.getChainId())
			window.location.reload();
			return true;
		} catch (switchError) {
			console.log('switchNetwork====', switchError)
			/* if(switchError.code === 4902){
				window.location.reload();
			} */
			this.addNetwork();
			throw new Error('切换网络失败，请稍后重试或联系支持。');
		}
	}

	async approveUsdt(amount: number): Promise<boolean> {
		if (!this._provider) throw new Error('Provider is not defined');
		const signer = this._provider.getSigner();
		const contract = new ethers.Contract(CONTRACT_CONFIG.USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
		try {
			const amountBN = new BigNumber(amount).times(new BigNumber(10).pow(CONTRACT_CONFIG.Decimals));
			const tx = await contract.approve(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, amountBN.toFixed(0));
			await tx.wait();
			return true;
		} catch (error) {
			console.error('approve error:', error);
			throw new Error('授权失败，请稍后重试或联系支持。');
		}
	}

	async approveCnd(amount: number): Promise<boolean> {
		if (!this._provider) { throw new Error('Provider is not defined'); }
		const signer = this._provider.getSigner();
		const contract = new ethers.Contract(CONTRACT_CONFIG.CND_ADDRESS, CND_ABI, signer);
		try {
			const amountBN = new BigNumber(amount).times(new BigNumber(10).pow(CONTRACT_CONFIG.Decimals));
			const tx = await contract.approve(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, amountBN.toFixed(0));
			await tx.wait();
			return true;
		} catch (error) {
			console.error('approve error:', error);
			throw new Error('授权失败，请稍后重试或联系支持。');
		}
	}
	handleError(action, error) {
		console.error(`${action} error:`, error);
		if (error.code === 4001) {
			throw new Error('用户取消交易');
		}
		if (typeof error === 'string') {
			throw new Error(JSON.parse(error).message);
		} else {
			throw new Error(`交易失败${error.message}`);
		}
	}

	async swapTokenByUsdt(tokenType: number, amount: number): Promise<boolean> {
		try {
			const amountBN = new BigNumber(amount).times(new BigNumber(10).pow(CONTRACT_CONFIG.Decimals));
			await this.approveUsdt(amount);
			const signer = this._provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, TOKEN_SWAP_ABI, signer);

			const tx = await contract.swap(tokenType, amountBN.toFixed(0));
			await tx.wait();
			return true;
		} catch (error) {
			this.handleError('swapTokenByUSDT', error);
		}
	}

	async swapTokenByCnd(amount: number): Promise<boolean> {
		try {
			const amountBN = new BigNumber(amount).times(new BigNumber(10).pow(CONTRACT_CONFIG.Decimals));
			await this.approveCnd(amount);
			const signer = this._provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, TOKEN_SWAP_ABI, signer);

			const tx = await contract.swapForCND(amountBN.toFixed(0));
			await tx.wait();
			return true;
		} catch (error) {
			this.handleError('swapTokenByCnd', error);
		}
	}

	async getRates() {
		try {
			const [CNHDPrice, HDCPrice] = await Promise.all([
				this.getCNHDPrice(),
				this.getHDCPrice()
			]);
			return { CNHDPrice, HDCPrice };
		} catch (error) {
			console.error(error)
			throw new Error('获取价格失败,请稍后重试。');
		}
	}

	async estimate(tokenType: number, amount: number): Promise<ethers.BigNumber> {
		const signer = this._provider.getSigner();
		const contract = new ethers.Contract(CONTRACT_CONFIG.SWAP_TOKEN_ADDRESS, TOKEN_SWAP_ABI, signer);
		try {
			const estimatedGas = await contract.estimateGas.swap(tokenType, BigInt(amount * (10 ** CONTRACT_CONFIG.Decimals)));
			return estimatedGas;
		} catch (error) {
			console.error('estimate error:', error);
			throw new Error('获取 Gas 价格失败，请稍后重试。');
		}
	}
}

export default new WalletMeta();