import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

// Components
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();
  const handleJoinPool = async () => {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        return toast.show({
          title: "Digita algo",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Deu certo",
        placement: "top",
        bgColor: "red.500",
      });

      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (!error.response?.data?.message) {
        toast.show({
          title: "Deu ruim",
          placement: "top",
          bgColor: "red.500",
        });
      } else {
        toast.show({
          title: error.response?.data?.message,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  };
  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title="Criar novo bolão" showBackButton />
      <VStack mt={8} mx={5} alignItems={"center"}>
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize="xl"
          textAlign={"center"}
          mb={8}
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão"
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button title="Buscar bolão" onPress={handleJoinPool} />
      </VStack>
    </VStack>
  );
};
