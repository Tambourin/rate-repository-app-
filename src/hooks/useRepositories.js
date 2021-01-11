import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
/*
  const fetchRepositories = async () => {
    
    
    setLoading(true);
    const response = await fetch('http://192.168.68.110:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);
*/
  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;