import React, { useCallback, useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Box, Text, Heading, Flex, Button, Image, List, ListItem, useDisclosure } from "@chakra-ui/react";

import { AssetsData } from '../type/type';
import AssetsModal from './assets-modal';
import AssetsStore from "../store/AssetsStore";

function ListAssets() {
  const assetsStore = useContext(AssetsStore.context);
  const { allAssets, selectedAssets } = assetsStore;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelected = useCallback((newAssets: AssetsData[]) => {
    newAssets.forEach(it => {
      assetsStore.addAsset(it);
    })
    onClose();
  }, [assetsStore, onClose]);

  const handleUpdate = useCallback((asset: AssetsData) => {
    asset.description += ' [updated]';
    assetsStore.updateAsset(asset);
  }, [assetsStore]);

  const handleRemove = useCallback((asset: AssetsData) => {
    assetsStore.removeAsset(asset);
  }, [assetsStore]);

  return (
    <>
      <Box p={4}>
        <Flex align="center" mb={6} gap={4}>
          <Heading as="h2" fontSize="2xl" mr={4}>
            Assets Manage
          </Heading>
          <Button
            display={{ base: "none", sm: "block" }}
            onClick={onOpen}
            disabled={allAssets.length == selectedAssets.length}
          >
            Add New Assets ({allAssets.length})
          </Button>
        </Flex>
        <List
          spacing={5}
          p={4}
          maxW='5xl'
          bg='blackAlpha.50'
        >
          {selectedAssets.map(it => (
            <ListItem key={it.name}>
              <Flex justifyContent="space-between">
                <Flex alignItems='center'>
                  <Box
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    mr={4}
                  >
                    <Image w="100%" src={it.imgSrc} />
                  </Box>
                  <Box>
                    <Text fontSize="xl" fontWeight="extrabold">
                      {it.name}
                    </Text>
                    <Text
                      fontWeight="bold"
                      color='blackAlpha.600'
                      wordBreak="break-word"
                    >
                      {it.description}
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems='center'>
                  <Button mr={3} onClick={() => handleUpdate(it)}>Update Description</Button>
                  <Button onClick={() => handleRemove(it)}>Remove</Button>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      <AssetsModal
        isOpen={isOpen}
        onClose={onClose}
        onOk={handleSelected}
        assets={allAssets.filter(it => selectedAssets.findIndex(iit => it.name === iit.name) < 0)}
      />
    </>
  );
}

export default observer(ListAssets);
