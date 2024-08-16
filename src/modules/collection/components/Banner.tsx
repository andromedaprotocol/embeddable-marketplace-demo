import { Box, Image } from "@chakra-ui/react";
import React, { FC } from "react";

interface BannerProps {
  image: string;
}

const Banner: FC<BannerProps> = (props) => {
  const { image } = props;

  return (
    <Box h="60" pos="relative" rounded="2xl" overflow="hidden" data-testid="banner">
      <Image
        src={image}
        alt="Main Image"
        w="full"
        h="full"
        fit="cover"
        data-testid="banner-main-image"
      />
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
        alt="Overlay Image"
        h="28"
        fit="contain"
        data-testid="banner-overlay-image"
      />
    </Box>
  );
};

export default Banner;
