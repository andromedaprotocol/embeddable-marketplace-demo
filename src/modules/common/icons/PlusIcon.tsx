import { Icon, type IconProps } from "@chakra-ui/react";

const PlusIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      d="M10 5V10M10 10V15M10 10H15M10 10L5 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default PlusIcon;
