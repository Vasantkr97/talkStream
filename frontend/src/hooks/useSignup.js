import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../lib/api";

const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending , error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authuser"] }),
  });

  return { isPending, error, SignupMutation: mutate };
}

export default useSignup;