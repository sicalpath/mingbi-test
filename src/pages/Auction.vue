<template lang="pug">
#auction
  img.cash(src="/static/cash.jpg")
  h2
    | 冥币实时发行价格：{{ price }} ETH
  h2
    | 即将发行冥币唯一编号：冥第 {{ parseInt(totalSupply / 44) }} 代-第 {{ totalSupply }} 号
  p
    | 注：
    | 天堂人民银行冥币每代限量总共44张。
    | 为同时控制阴间通胀人间的囤积天地通用货币之行为，
    | 每申请发行一张冥币，将导致人间冥币发行价的上涨。
    | 一周后开放自由交易。
  el-button(type="primary", @click="applyAuction")
    | 请求发行
</template>

<script>
import Wallet from '@/utils/wallet';

export default {
  name: 'Auction',
  data() {
    return {
      wallet: new Wallet(this),
      price: 0,
      totalSupply: '0',
    };
  },
  methods: {
    getPrice() {
      this.wallet.contract.getPrice((error, result) => {
        if (error) {
          this.$message({
            type: 'error',
            message: error,
          });
        } else {
          this.price = this.wallet.toEther(result);
        }
      });
    },
    getTotalSupply() {
      this.wallet.contract.totalSupply((error, result) => {
        if (error) {
          this.$message({
            type: 'error',
            message: error,
          });
        } else {
          ++result;
          this.totalSupply = result.toString();
        }
      });
    },
    applyAuction() {
      this.wallet.contract.breed({
        value: this.wallet.toWei(this.price),
        gas: 220000,
        gasPrice: 1000000000 * 20,
      }, (error, result) => {
        if (!error) {
          this.$message({
            type: 'info',
            message: `已请求 ${result}`,
          });
        } else {
          this.$message({
            type: 'error',
            message: error,
          });
        }
      });
    },
  },
  mounted() {
    this.getPrice();
    this.getTotalSupply();
  },
};
</script>

<style lang="stylus" scoped>
#auction
  text-align center
  padding 20px
.post
  width: 80%
.cash
  width: 50%
  padding: 20px
</style>
