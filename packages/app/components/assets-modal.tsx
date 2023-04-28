import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from 'mobx-react-lite';
import {
  Box, Wrap, WrapItem, Button, Checkbox, Image, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";
import { SpinnerIcon } from '@chakra-ui/icons'

import { AssetsData } from '../type/type';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (selectedAsstets: AssetsData[]) => void;
  assets: AssetsData[];
  selectLimit?: number;
}

function AssetsModal(props: IProps) {
  const { isOpen, onClose, onOk, assets, selectLimit = 0 } = props;
  const initialRef = useRef(null);

  const [localAssets, setLocalAssets] = useState([] as AssetsData[]);

  const handleSelect = useCallback((checked, item) => {
    if (checked) {
      setLocalAssets(origin => [...origin, { ...item }]);
    } else {
      setLocalAssets(origin => origin.filter(it => it.name !== item.name));
    }
  }, []);

  const handleOk = useCallback(() => {
    onOk(localAssets);
  }, [localAssets, onOk]);

  useEffect(() => {
    if (isOpen) {
      setLocalAssets([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} initialFocusRef={initialRef} onClose={onClose} size='3xl' isCentered>
      <ModalOverlay />
      <ModalContent ref={initialRef}>
        <ModalHeader>Select Assets {selectLimit > 0 ? `(${selectLimit} at most)` : ''}</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH={400} overflowY='scroll' px='60px'>
          <Wrap spacing={10}>
            {
              assets.map(it => (
                <WrapItem key={it.name}>
                  <Checkbox
                    disabled={
                      selectLimit > 0 && localAssets.length >= selectLimit
                      && !localAssets.map(a => a.name).includes(it.name)
                    }
                    onChange={(e) => handleSelect(e.target.checked, it)}
                  >
                    <Flex w={100} h={100} alignItems='center' justifyContent='center'>
                      <Image
                        w="100%"
                        src={it.imgSrc}
                        fallback={<SpinnerIcon />}
                      />
                    </Flex>
                    <Box
                      w={100}
                      textAlign='center'
                      textOverflow='ellipsis'
                      overflow='hidden'
                      whiteSpace='nowrap'
                    >
                      {it.name}
                    </Box>
                  </Checkbox>
                </WrapItem>
              ))
            }
          </Wrap>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={4} onClick={onClose}>Cancel</Button>
          <Button colorScheme='blue' onClick={handleOk}>Ok</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default observer(AssetsModal);
