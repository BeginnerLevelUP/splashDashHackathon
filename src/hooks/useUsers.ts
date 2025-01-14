import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (limit = 10) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    return response.json();
};

const useUsers = (limit:number) => {
    return useQuery({
        queryKey: ['users', limit],
        queryFn: () => fetchUsers(limit),
    })
}

export {useUsers}


//use enable property to fetch data after a certain condition is met

//for creating data use useMutation add in onSucess and onError queryClient.setQueryData([queryKey,id], data) to update the cache
//pagination keeprpeviousdata:true property to keep the previous data