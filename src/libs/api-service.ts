export async function fectData<T>(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  data?: any,
  tag?: string
) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);

    if (
      (method === "POST" || method === "DELETE" || method === "PUT") &&
      data
    ) {
      options.body = JSON.stringify(data);
    }
    console.log(`method ${options.method}`);
    console.log(`Body ${options.body}`);

    const res = await fetch(url, options);
    console.log(`res ${res.status}`);

    if (!res.ok) {
      throw new Error(`Error ${tag || ""}: ${res.status} ${res.statusText}`);
    }
    const responseData = method === "GET" ? ((await res.json()) as T) : null;

    return responseData;
  } catch (error) {
    console.log(error);
  }
}
