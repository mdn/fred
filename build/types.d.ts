import { BuiltPage } from "@mdn/rari";
import { StatsCompilation } from "@rspack/core";

export interface WorkerData {
  reqPath: string;
  page: BuiltPage;
  compliationStats: StatsCompilation[];
}
