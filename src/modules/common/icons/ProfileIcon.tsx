import { Icon, type IconProps } from "@chakra-ui/react";

function ProfileIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 30 30" {...props}>
      <rect width="30" height="30" rx="6" fill="#F9F5FF" />
      <rect x="6" y="6" width="6" height="6" rx="1" fill="#7F56D9" />
      <rect x="18" y="18" width="6" height="6" rx="1" fill="#7F56D9" />
      <rect x="18" y="6" width="6" height="6" rx="1" fill="#7F56D9" />
      <rect x="6" y="18" width="6" height="6" rx="1" fill="#D6BBFB" />
      <rect x="12" y="12" width="6" height="6" rx="1" fill="#E9D7FE" />
    </Icon>
  );
}

export default ProfileIcon;
