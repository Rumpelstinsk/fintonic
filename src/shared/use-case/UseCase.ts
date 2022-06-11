export interface UseCase<Parameters, Response> {
  invoke: (params: Parameters) => Response;
}
