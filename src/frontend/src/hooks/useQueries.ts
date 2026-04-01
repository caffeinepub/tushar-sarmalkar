import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.submitMessage(name, email, message);
    },
  });
}
