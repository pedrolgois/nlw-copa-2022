import { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Conexão api
import { api } from "../../services/api";

// Components
import { PoolCard, PoolProps } from "../../components/PoolCard";
import { Loading } from "../../components/Loading";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { EmptyPoolList } from "../../components/EmptyPoolList";

export const Pools = () => {
  const [isLoading, SetisLoading] = useState(true);
  const [pools, setPools] = useState<PoolProps[]>([] as PoolProps[]);
  const { navigate } = useNavigation();

  const toast = useToast();

  const fetchPools = async () => {
    try {
      const response = await api.get("/pools");
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      SetisLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Meus bolões"} />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor={"gray.600"}
        pb={4}
        mb={4}
      >
        <Button
          title={"BUSCAR BOLÃO POR CÓDIGO"}
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
};
