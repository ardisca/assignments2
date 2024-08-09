import { getAllDataQuest } from "./controller/api_controller";
import { renderDataList, attachPostDataListener } from "./dom/dom_manipulation";

async function app() {
  const listDataQuest = await getAllDataQuest();

  if (listDataQuest && listDataQuest.data) {
    renderDataList(listDataQuest.data);
  }

  attachPostDataListener();
}

app();
