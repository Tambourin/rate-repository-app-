import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const storage = useContext(AuthStorageContext);
  const [ mutate, result ] = useMutation(SIGN_IN);
  
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const response = await mutate({ variables: { username, password } });
    storage.setAccessToken(response.data.authorize.accessToken);
    client.resetStore();
  };

  const signOut = async () => {
    storage.removeAccessToken();
    client.resetStore();
  };



  //const authorizedUser = data?.authorizedUser;
  //console.log(authorizedUser);  

  return [ signIn, result, signOut ];
};

export default useSignIn;