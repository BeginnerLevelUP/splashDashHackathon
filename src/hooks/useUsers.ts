import { useQuery } from "@tanstack/react-query";
import User from "../lib/types/User"; // Adjust import path as needed

const fetchUsers = async (limit: number): Promise<User[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    return response.json();
};

const useUsers = (limit: number) => {
    return useQuery<User[]>({
        queryKey: ['users', limit],
        queryFn: () => fetchUsers(limit),
    });
};

export default useUsers;

//for creating data use useMutation add in onSucess and onError queryClient.setQueryData([queryKey,id], data) to update the cache
//pagination keeprpeviousdata:true property to keep the previous data