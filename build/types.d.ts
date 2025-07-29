import { PartialContext } from "@fred";
import { StatsCompilation } from "@rspack/core";

export interface WorkerData {
  reqPath: string;
  context: PartialContext;
  compilationStats: StatsCompilation[];
}
