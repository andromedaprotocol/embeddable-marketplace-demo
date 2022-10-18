import { Icon, type IconProps } from "@chakra-ui/react";

const ChevronRightIcon = (props: IconProps) => (
  <Icon viewBox="0 0 21 20" fill="none" {...props}>
    <path
      d="M8 15L13 10L8 5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ChevronRightIcon;
