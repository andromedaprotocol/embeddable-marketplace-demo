import { Box, BoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

interface ProgressBarProps {
  background?: string;
  stages: number;
  currentStage: number;
}

const ProgressBar: FC<ProgressBarProps & BoxProps> = memo(function ProgressBar({
  background,
  stages,
  currentStage,
  ...props
}) {
  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${stages}, 1fr)`,
        gridGap: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...props.sx,
      }}
    >
      {Array.apply(null, [...Array(stages)]).map((_, idx) => (
        <Box
          key={`progress-${idx}`}
          style={{
            height: "6px",
            borderRadius: "8px",
            background: background ?? "#4277FF",
            opacity: currentStage >= idx ? 1 : 0.5,
          }}
        />
      ))}
    </Box>
  );
});

export default ProgressBar;
