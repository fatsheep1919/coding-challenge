import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const OsmoPrice = () => {
  return (
    <Box>
      <Text
        fontWeight="semibold"
        color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
        mb={1}
      >
        OSMO Price
      </Text>
      <Text fontSize="3xl" fontWeight="bold" py={2}>
        $4.41
      </Text>
    </Box>
  );
}

export default OsmoPrice;
