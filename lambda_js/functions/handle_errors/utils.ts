export function extractErrorData(input) {
  return {
    email: input?.Records[0]?.messageAttributes?.email?.stringValue,
    error: JSON.parse(input?.Records[0]?.body)?.errorMessage,
  };
}
