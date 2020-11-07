import { Box } from "@chakra-ui/core";
import React from "react";
import PreviewDetails from "./PreviewDetails";

interface Props {}

const StockPreview: React.FC<Props> = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" display="flex">
      <img src="" alt="" />
      <PreviewDetails />
    </Box>
  );
};

export default StockPreview;
