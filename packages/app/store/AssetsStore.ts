import { createContext } from 'react';
import { observable, makeObservable, runInAction } from 'mobx';

import { AssetsData } from '../type/type';

export default class AssetsStore {
  static context = createContext<AssetsStore>({} as AssetsStore);

  allAssets: AssetsData[] = [];

  selectedAssets: AssetsData[] = [];

  constructor() {
    makeObservable(this, {
      allAssets: observable,
      selectedAssets: observable,
    });
  }

  init(initialAssets: AssetsData[]) {
    runInAction(() => this.allAssets = initialAssets);
  }

  addAsset(asset: AssetsData) {
    if (!asset?.name) {
      return;
    }

    const index = this.selectedAssets.findIndex(it => it.name === asset.name);
    if (index < 0) {
      runInAction(() => {
        this.selectedAssets.push(asset);
      })
    }
  }

  updateAsset(asset: AssetsData) {
    if (!asset?.name) {
      return;
    }

    const updatedAssets = this.selectedAssets.map(it => {
      if (it.name === asset.name) {
        return { ...asset };
      }
      return it;
    });

    runInAction(() => {
      this.selectedAssets = updatedAssets;
    });
  }

  removeAsset(asset: AssetsData) {
    if (!asset?.name) {
      return;
    }

    const updatedAssets = this.selectedAssets.filter(it => it.name !== asset.name);
    runInAction(() => {
      this.selectedAssets = updatedAssets;
    });
  }
}
