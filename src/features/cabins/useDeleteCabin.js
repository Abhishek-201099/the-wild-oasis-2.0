import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: function () {
      toast.success("Cabin successfully deleted");
      // invalidating so it immediately updates the table
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: function (err) {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
}
