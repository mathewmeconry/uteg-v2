import { Module, ModuleHandlers } from "./types";

export function getModulesHandlers(
  modules: Module[],
  handler: keyof ModuleHandlers
): ModuleHandlers[keyof ModuleHandlers][] {
  return modules
    .map((module) => module.handlers[handler])
    .filter((handler) => handler);
}
