import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { asset_list } from '@chain-registry/osmosis';

import Assets from '../../components/assets-list';
import AssetsStore from "../../store/AssetsStore";

const AssetsStoreContextProvider = AssetsStore.context.Provider;

export default observer(function () {
  const assetsStore = new AssetsStore();

  useEffect(() => {
    const totalAssets = asset_list.assets
      .map(({ name, description, logo_URIs }) => ({
        name,
        description,
        imgSrc: logo_URIs?.png || '',
      }))
      .sort((a, b) => a.imgSrc ? -1 : 1);

    // initialize all assets, limit to 10 in total
    const initialAssets = totalAssets.splice(0, 10);
    assetsStore.init(initialAssets);

    // initialize selected assets to show in the list
    const [asset1, asset2,] = initialAssets;
    assetsStore.addAsset(asset1);
    assetsStore.addAsset(asset2);

  }, [assetsStore]);

  return (
    <AssetsStoreContextProvider value={assetsStore}>
      <Assets />
    </AssetsStoreContextProvider>
  );
});