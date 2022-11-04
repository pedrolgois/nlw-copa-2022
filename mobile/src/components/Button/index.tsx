import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

export const Button = ({ title, type = "PRIMARY", ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        textTransform="uppercase"
        marginBottom={-1}
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
