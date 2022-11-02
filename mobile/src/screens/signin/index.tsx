import { Center, Text } from "native-base"

export const SignIn = () =>{
  return(
    <Center flex={1} bgColor={'gray.900'} alignItems={'center'} justifyContent={'center'}>
        <Text color={'white'} fontSize={24}>
          Sign In!
        </Text>         
    </Center>
  )
}