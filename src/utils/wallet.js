import Web3 from 'web3';
import abi from '@/assets/abi.json';

export default class Wallet {
  constructor(instance) {
    this.instance = instance;
    if (typeof window.web3 !== 'undefined') {
      this.wallet = new Web3(window.web3.currentProvider);
    } else {
      instance.$message({
        type: 'error',
        message: '没有找到 Web3 插件，无法交易, 考虑一下安装 MetaMask 插件？',
      });
    }
    if (this.wallet.eth.accounts.length === 0) {
      instance.$message({
        type: 'error',
        message: '您的 Web3 插件没有登录或注册钱包，尚不能使用交易功能。',
      });
    }
    this.account = this.wallet.eth.accounts[0];
    this.wallet.eth.defaultAccount = this.account;
    const Contract = this.wallet.eth.contract(abi);
    this.contract = Contract.at('0x69ce2f2643c5b83eb23d7f1c65a8e85df37ae63a');
  }

  toWei(price) {
    return this.wallet.toWei(Number(price), 'ether');
  }

  toEther(price) {
    return this.wallet.fromWei(Number(price), 'ether');
  }
}
