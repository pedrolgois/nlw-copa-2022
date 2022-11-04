import { Heading, Text, VStack } from "native-base";

// Imagens
import Logo from "../../assets/logo.svg";

// Components
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const New = () => {
  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems={"center"}>
        <Logo />
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize="xl"
          textAlign={"center"}
          my={8}
        >
          Crie seu próprio bolão da copa{"\n"}e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder="Qual o nome do seu bolão" />
        <Button title="Criar meu bolão" />

        <Text
          color={"gray.200"}
          fontSize={"sm"}
          textAlign={"center"}
          px={10}
          mt={6}
        >
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
};
