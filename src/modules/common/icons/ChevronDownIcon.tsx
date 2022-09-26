import { Icon, type IconProps } from "@chakra-ui/react";

const ChevronDownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 16 16" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.52925 5.52858C3.7896 5.26823 4.21171 5.26823 4.47206 5.52858L8.00065 9.05717L11.5292 5.52858C11.7896 5.26823 12.2117 5.26823 12.4721 5.52858C12.7324 5.78892 12.7324 6.21103 12.4721 6.47138L8.47206 10.4714C8.21171 10.7317 7.7896 10.7317 7.52925 10.4714L3.52925 6.47138C3.2689 6.21103 3.2689 5.78892 3.52925 5.52858Z"
      fill="currentColor"
    />
  </Icon>
);

export default ChevronDownIcon;
