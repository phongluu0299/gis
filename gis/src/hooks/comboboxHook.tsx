import { useQuery } from "@tanstack/react-query";


import { optionService } from "../services/optionservice";

export function useUnitOptions() {
  return useQuery({
    queryKey: ["unit", "options"],
    queryFn: async () => await optionService.unitOptions(),
    staleTime: 60 * 60 * 1000,
  });
}

export function useAppOptions() {
  return useQuery({
    queryKey: ["app", "options"],
    queryFn: async () => await optionService.appOptions(),
    staleTime: 60 * 60 * 1000,
  });
}

export function useServiceOptions() {
  return useQuery({
    queryKey: ["service", "options"],
    queryFn: async () => await optionService.serviceOptions(),
    staleTime: 60 * 60 * 1000,
  });
}