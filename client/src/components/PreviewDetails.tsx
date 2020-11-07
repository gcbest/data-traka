import { Box } from "@chakra-ui/core";
import React from "react";

interface Props {}

const PreviewDetails: React.FC<Props> = () => {
  return (
    <Box>
      <p className="name"></p>
      <p className="price"></p>
    </Box>
  );
};

export default PreviewDetails;
