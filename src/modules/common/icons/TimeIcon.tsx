import { Icon, type IconProps } from "@chakra-ui/react";

function TimeIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8.7 6.5H10.9V12H16.4V14.2H8.7V6.5Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM20.8 12C20.8 16.8601 16.8601 20.8 12 20.8C7.13989 20.8 3.2 16.8601 3.2 12C3.2 7.13989 7.13989 3.2 12 3.2C16.8601 3.2 20.8 7.13989 20.8 12Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export default TimeIcon;
