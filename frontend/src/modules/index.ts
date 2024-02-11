import { Module, ModuleHandlers } from "./types";

export function getModulesHandlers<T>(
  modules: Module[],
  handler: keyof ModuleHandlers
): T[] {
  return modules
    .map((module) => module.handlers[handler])
    .filter((handler) => handler) as unknown as T[];
}
