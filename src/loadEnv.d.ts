declare module "rjutils-collection" {
  export function loadEnv(file: string, isAsync: true): Promise<Record<string, string>>
  export function loadEnv(file: string, isAsync: false): Record<string, string>
}