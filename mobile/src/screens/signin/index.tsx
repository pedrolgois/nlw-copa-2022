import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

export const SignIn = () => {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center
      flex={1}
      bgColor={"gray.900"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={7}
    >
      <Logo width={212} height={40} />
      <Button
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        title="Entrar com google"
        type="SECONDARY"
        mt={8}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{"\n"}do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
};
