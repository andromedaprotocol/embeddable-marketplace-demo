import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";
import { getColor } from "@chakra-ui/theme-tools";

const size: Record<string, SystemStyleObject> = {
  md: {
    height: "44px",
    px: "14px",
    borderRadius: "lg",
  },
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  md: {
    field: size.md,
    addon: size.md,
  },
};

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props;

  return {
    field: {
      borderColor: "gray.300",
      _hover: {},
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 1,
        bg: "gray.50",
        borderColor: "gray.300",
        color: "gray.500",
      },
      _invalid: {
        borderColor: "error.300",
        boxShadow: "none",
        _focus: {
          borderColor: "error.300",
          boxShadow: `0 0 0 4px ${getColor(theme, "error.100")}`,
        },
      },
      _focus: {
        zIndex: 1,
        borderColor: "primary.300",
        boxShadow: `0 0 0 4px ${getColor(theme, "primary.100")}`,
      },
      _placeholder: { opacity: 1, color: "gray.500", fontSize: "md" },
    },
  };
};

const variants = {
  outline: variantOutline,
};

const styles = {
  sizes,
  variants,
};

export default styles;
