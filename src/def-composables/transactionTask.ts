export async function runTransactionTask<T extends {code: number; rawLog?: string}>(
  execute: () => Promise<T>,
  confirmed: (result: T) => unknown,
  failed: (error: unknown) => unknown,
  refreshFailed: (error: unknown) => unknown,
): Promise<void> {
  let result: T;
  try {
    result = await execute();
    if (result.code !== 0) throw new Error(result.rawLog || `Transaction failed with code ${result.code}`);
  } catch (error) {
    await failed(error);
    return;
  }
  try {
    await confirmed(result);
  } catch (error) {
    await refreshFailed(error);
  }
}
