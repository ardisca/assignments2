import { fectData } from "../libs/api-service";
import { API_URL } from "../shared/shared_value";
import { IQuest } from "../types/entytys";

interface IQuestResult {
  data: IQuest[];
}

export async function getAllDataQuest() {
  try {
    const res = await fectData<IQuestResult>(API_URL, "GET");
    console.log(res?.data);
    if (!res) {
      console.log("Error gan");
      return;
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDataQuest(id: string) {
  try {
    const res = await fectData<IQuestResult>(API_URL, "DELETE", [id]);

    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateDataQuest(data: Object) {
  try {
    console.log(data);
    const res = await fectData<IQuestResult>(API_URL, "PUT", data);

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function postDataQuest(
  title: string,
  content: string,
  attachment?: string
) {
  try {
    const body = [{ title: title, content: content, attachment_0: attachment }];
    const res = await fectData<IQuestResult>(API_URL, "POST", body);

    return res;
  } catch (error) {
    console.log(error);
  }
}
