import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const RewardDistributionOn = () => {
  return (
    <Box>
      <Text
        fontWeight="semibold"
        color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
        mb={2}
      >
        Reward distribution on
      </Text>
      <Flex align="center">
        <Text fontSize="3xl" fontWeight="bold">
          12
        </Text>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          px={3}
          mx={1}
        >
          <Text fontSize="2xl" fontWeight="bold">
            H
          </Text>
        </Box>
        <Text fontSize="3xl" fontWeight="bold">
          19
        </Text>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          px={3}
          mx={1}
        >
          <Text fontSize="2xl" fontWeight="bold">
            M
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default RewardDistributionOn;

