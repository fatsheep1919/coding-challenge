import { createContext } from 'react';
import { observable, makeObservable, runInAction } from 'mobx';

import { PoolsData, AssetsData } from '../type/type';
import { getRandomId, getRandomPoolLiquidity, getRandomAPR, getRandomMyLiquidity } from '../util';

export default class PoolsStore {
  static context = createContext<PoolsStore>({} as PoolsStore);

  assetsOptions: AssetsData[] = [];

  allPools: PoolsData[] = [];

  constructor() {
    makeObservable(this, {
      allPools: observable,
      assetsOptions: observable,
    });
  }

  init(assetsOptions: AssetsData[]) {
    runInAction(() => {
      this.assetsOptions = assetsOptions;
    });
  }

  addPool(asset1: AssetsData, asset2: AssetsData) {
    const poolsData = this.constructPoolsData(asset1, asset2);
    runInAction(() => {
      this.allPools.push(poolsData);
      this.assetsOptions = this.assetsOptions
        .filter(it => it.name !== asset1.name && it.name !== asset2.name);
    });
  }

  constructPoolsData(asset1: AssetsData, asset2: AssetsData) {
    const token1 = { name: asset1.name, imgSrc: asset1.imgSrc };
    const token2 = { name: asset2.name, imgSrc: asset2.imgSrc };
    const poolLiquidity = getRandomPoolLiquidity(1)[0];
    const apr = getRandomAPR(1)[0];
    const myLiquidity = getRandomMyLiquidity(1)[0];

    return {
      id: getRandomId(),
      token1: token1,
      token2: token2,
      poolLiquidity: poolLiquidity,
      apr: apr,
      myLiquidity: myLiquidity,
      myBoundedAmount: myLiquidity,
      longestDaysUnbonding: Math.random() < 0.5,
    }
  }
}