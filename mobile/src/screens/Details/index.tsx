import { useState, useEffect } from "react";
import { Share } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";
import { PoolProps } from "../../components/PoolCard";
import { PoolHeader } from "../../components/PoolHeader";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Option } from "../../components/Option";
import { Guesses } from "../../components/Guesses";

export const Details = () => {
  const [optionSelected, setOptionSelected] = useState<
    "Seus Palpites" | "Ranking"
  >("Seus Palpites");
  const [pool, setPool] = useState<PoolProps>({} as PoolProps);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { id } = route.params as { id: string };

  const toast = useToast();

  const fetchPoolDetais = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPool(response.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "deu ruim",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeShare = async () => {
    await Share.share({
      message: pool.code,
    });
  };

  useEffect(() => {
    fetchPoolDetais();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header
        title={pool.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pool._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={pool} />
          <HStack bgColor={"gray.800"} p={1} rounded={"sm"} mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected == "Seus Palpites"}
              onPress={() => setOptionSelected("Seus Palpites")}
            />
            <Option
              title="Ranking"
              isSelected={optionSelected == "Ranking"}
              onPress={() => setOptionSelected("Ranking")}
            />
          </HStack>

          <Guesses poolId={pool.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </VStack>
  );
};
