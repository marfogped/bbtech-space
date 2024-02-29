import { useContext } from "react";
import { SanityContext } from "../contexts/SanityContext";

export function useSanity() {
  return useContext(SanityContext)!;
}