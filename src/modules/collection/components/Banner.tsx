import { Box, Image } from "@chakra-ui/react";
import React, { FC } from "react";

interface BannerProps {
  image: string;
}
const Banner: FC<BannerProps> = (props) => {
  const { image } = props;

  return (
    <Box h="60" pos="relative" rounded="2xl" overflow="hidden">
      <Image src={image} alt="Image" w="full" h="full" fit="cover" />
      <Image
        _hover={{
          scale: '105%',
        }}
        transform='auto'
        transition='ease-in-out'
        transitionDuration='100ms'
        pos="absolute"
        rounded="2xl"
        bottom="4"
        left="4"
        border="2px solid white"
        src={image}
        alt="Image"
        h="28"
        fit="contain"
      />
    </Box>
  );
};
export default Banner;
