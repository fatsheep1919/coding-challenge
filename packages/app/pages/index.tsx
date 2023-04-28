import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { asset_list } from '@chain-registry/osmosis';

import { getShuffledArr } from '../util';
import Pools from '../components/pools-list';
import PoolsStore from '../store/PoolsStore';

const PoolsStoreContextProvider = PoolsStore.context.Provider;

export default observer(function () {
  const poolsStore = new PoolsStore();

  useEffect(() => {
    const allAssets = getShuffledArr(
      asset_list.assets
        .map(({ name, logo_URIs }) => ({
          name,
          imgSrc: logo_URIs?.png || '',
        }))
        .filter(it => it.imgSrc)
    ).splice(0, 16);

    const initialPoolCount = 2;
    const poolOptionToken1 = [...allAssets].splice(0, initialPoolCount)
    const poolOptionToken2 = [...allAssets].splice(initialPoolCount, initialPoolCount * 2)

    // initialize assets options
    poolsStore.init(allAssets);

    // initialize pools
    poolsStore.addPool(poolOptionToken1[0], poolOptionToken1[1]);
    poolsStore.addPool(poolOptionToken2[0], poolOptionToken2[1]);

  }, [poolsStore]);

  // poolsStore may be passed by props
  return (
    <Pools store={poolsStore} />
  )
  // poolsStore may be shared by underlying components by the way of useContext
  /*
  return (
    <PoolsStoreContextProvider value={poolsStore}>
      <Pools />
    </PoolsStoreContextProvider>
  );
  */
});

