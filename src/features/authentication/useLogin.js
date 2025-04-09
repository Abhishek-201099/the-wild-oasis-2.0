import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //Manually adding user to query cache so it doesn't load on login.
      queryClient.setQueryData(["user"], user?.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(`Invalid email or password`);
      console.log(err.message);
    },
  });

  return { login, isLoading };
}
