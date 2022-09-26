import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/theme/ui-elements";
import { ButtonProps } from "@chakra-ui/react";

interface CopyButtonProps extends ButtonProps {
  text: string;
  copiedProps?: ButtonProps;
}
const CopyButton: FC<CopyButtonProps> = (props) => {
  const { text, children, copiedProps = {}, ...buttonProps } = props;
  const [notification, setNotification] = useState(false);

  const handleCopy = useCallback(() => {
    setNotification(true);
    navigator.clipboard.writeText(text);
  }, [text, setNotification]);

  useEffect(() => {
    if (notification) {
      const tId = setTimeout(() => {
        setNotification(false);
      }, 1000);
      return () => {
        setNotification(false);
        clearInterval(tId);
      };
    }
  }, [notification]);

  if (notification) {
    return (
      <Button onClick={handleCopy} p="1" {...buttonProps} {...copiedProps}>
        Copied!
      </Button>
    );
  }

  return (
    <Button onClick={handleCopy} {...buttonProps}>
      {children}
    </Button>
  );
};
export default CopyButton;
