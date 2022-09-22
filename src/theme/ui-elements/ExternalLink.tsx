import React, { FC } from "react";
import { HStack, Icon, Text, chakra } from "@/theme/ui-elements";
import { ExternalLinkIcon } from "@/theme/icons";

type Props = {
  label: string;
  href: string;
  color?: string;
};

const ExternalLink: FC<Props> = ({ href, label, color = "primary.600" }) => {
  return (
    <chakra.a href={href} target="_blank" display="inline-block">
      <HStack color={color}>
        <Text fontWeight={500}>{label}</Text>
        <Icon as={ExternalLinkIcon} boxSize={5} />
      </HStack>
    </chakra.a>
  );
};

export default ExternalLink;
