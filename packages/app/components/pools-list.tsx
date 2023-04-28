import React, { useCallback, useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Box, Heading, Text, Flex, Button, useColorModeValue, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useRouter } from 'next/router';

import { AssetsData } from '../type/type';
import PoolsStore from '../store/PoolsStore';
import OsmoPrice from './osmo-price';
import RewardDistributionOn from "./reward-distribution-on";
import PoolsCard from './pools-card';
import AssetsModal from "./assets-modal";

function ListPools(props: { store: PoolsStore }) {
  // read poolsStore from props
  const { store: poolsStore } = props;
  const { assetsOptions, allPools } = poolsStore;
  // or read poolsStore from context
  /*
  const poolsStore = useContext(PoolsStore.context);
  const { assetsOptions, allPools } = poolsStore;
  */

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreatePool = useCallback((selectedAsstets: AssetsData[]) => {
    if (selectedAsstets?.length === 2) {
      const [asset1, asset2] = selectedAsstets;
      poolsStore.addPool(asset1, asset2);
    }
    onClose();
  }, [poolsStore, onClose]);

  return (
    <>
      <Box p={4}>
        <Flex align="center" mb={6} gap={4}>
          <Heading as="h2" fontSize="2xl" mr={4}>
            Active Pools
          </Heading>
          <Button display={{ base: "none", sm: "block" }} onClick={onOpen}>Create New Pool</Button>
          <Button
            display={{ base: "none", sm: "block" }}
            onClick={() => {
              router.push('/assets');
            }}
          >
            Assets Manage
          </Button>
        </Flex>
        <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
          <OsmoPrice />
          <RewardDistributionOn />
        </SimpleGrid>
        <Box
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          m={-4}
          px={4}
          py={6}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            My Pools
          </Text>
          <PoolsCard poolsData={allPools} />
        </Box>
      </Box>
      <AssetsModal
        isOpen={isOpen}
        onClose={onClose}
        onOk={handleCreatePool}
        assets={assetsOptions}
        selectLimit={2}
      />
    </>
  );
}

export default observer(ListPools);
