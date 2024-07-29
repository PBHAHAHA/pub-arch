import type { FetchContext, FetchResponse } from "ofetch";
/**
 * 请求拦截器
 */
export const useFetchInterceptor = (options = { showError: true }) => {
  // 解构选项
  const { showError } = options;

  // 拦截响应错误
  const onResponseError = (
    context: FetchContext & {
      response: FetchResponse<ResponseType>;
    }
  ) => {
    const toast = useToast();
    const error = context.response?._data;

    if (showError && error && error.data?.name === "ZodError") {
      toast.remove(error.url);
      toast.add({
        id: error.url,
        title: error.data.issues[0].message,
      });

      return;
    }

    if (showError && error && error.message) {
      toast.remove(error.url);
      toast.add({ id: error.url, title: error.message });

      return;
    }
  };

  return { onResponseError };
};
