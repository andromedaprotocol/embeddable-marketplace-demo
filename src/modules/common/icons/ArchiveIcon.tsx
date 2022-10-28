import { Icon, type IconProps } from "@chakra-ui/react";

const ArchiveIcon = (props: IconProps) => (
  <Icon viewBox="0 0 16 16" fill="none" {...props}>
    <clipPath id="a">
      <path d="m0 0h16v16h-16z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path
        d="m14.0003 5.33333v8.66667h-11.99997v-8.66667m4.66666 2.66667h2.66667m-8.666668-6h14.666708v3.33333h-14.666708z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </g>
  </Icon>
);

export default ArchiveIcon;
