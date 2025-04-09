import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: bookingDelete, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking  successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error(`Error while deleting booking`),
  });

  return { bookingDelete, isDeletingBooking };
}
