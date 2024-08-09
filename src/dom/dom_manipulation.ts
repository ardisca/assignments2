import {
  deleteDataQuest,
  postDataQuest,
  updateDataQuest,
} from "../controller/api_controller";
import { IQuest } from "../types/entytys";

export function renderDataList(quests: IQuest[]) {
  const experienceContent = document.querySelector(".experience-content");

  quests.forEach((element) => {
    const questContainer = document.createElement("div");
    questContainer.className = "container-content";

    const experienceContentTittle = document.createElement("div");
    experienceContentTittle.className = "experience-content-tittle";

    const imgQuest = document.createElement("img");
    imgQuest.src = element.attachment_0 || "";
    imgQuest.alt = `Image`;
    // imgQuest.style.width = "65px";
    imgQuest.style.height = "65px";
    imgQuest.style.objectFit = "cover";

    const titleQuest = document.createElement("h1");
    titleQuest.className = "title-content";
    titleQuest.textContent = element.title;

    const contentQuest = document.createElement("p");
    contentQuest.className = "descript-content";
    contentQuest.textContent = element.content;

    const buttonQuest = document.createElement("button");
    buttonQuest.className = "button-quest";
    buttonQuest.textContent = "Delete";

    const contentAnswer = document.createElement("p");
    contentAnswer.className = "content-answer";
    contentAnswer.textContent = element.answer || "No answer yet";

    const paddingDiv = document.createElement("div");
    paddingDiv.className = "padding";

    const inputAnswer = document.createElement("input");
    inputAnswer.className = "input-answer";
    inputAnswer.placeholder = "Answer";

    const buttonAnswer = document.createElement("button");
    buttonAnswer.className = "button-answer";
    buttonAnswer.textContent = "Answer";

    buttonQuest.addEventListener("click", async () => {
      await deleteQuest(element._id);
    });

    buttonAnswer.addEventListener("click", async () => {
      console.log(inputAnswer.value);
      await updateQuest(
        element._id,
        element.title,
        element.content,
        element.attachment_0,
        inputAnswer.value
      );
    });

    experienceContentTittle.append(
      imgQuest,
      titleQuest,
      contentQuest,
      buttonQuest
    );
    paddingDiv.append(inputAnswer);
    questContainer.append(
      experienceContentTittle,
      contentAnswer,
      paddingDiv,
      buttonAnswer
    );

    experienceContent?.appendChild(questContainer);
  });
}

async function updateQuest(
  id: string,
  title: string,
  content: string,
  attachment_0?: string,
  answer?: string
) {
  try {
    const data = {
      _id: id,
      title: title,
      content: content,
      attachment_0: attachment_0 ?? "",
      answer: answer ?? "",
    };
    await updateDataQuest(data);
    console.log(`Update quest with ID: ${id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
async function deleteQuest(id: string) {
  try {
    await deleteDataQuest(id);
    console.log(`Delete quest with ID: ${id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export function attachPostDataListener() {
  const inputTitle = document.getElementById("idTitle") as HTMLInputElement;
  const inputAttachment = document.getElementById(
    "idImage"
  ) as HTMLInputElement;
  const inputContent = document.getElementById(
    "idContent"
  ) as HTMLTextAreaElement;
  const btnSubmit = document.getElementById("actSubmite");

  btnSubmit?.addEventListener("click", async () => {
    const title = inputTitle.value;
    const attachment = inputAttachment.value;
    const content = inputContent.value;

    try {
      await postDataQuest(title, content, attachment);
      inputTitle.value = "";
      inputAttachment.value = "";
      inputContent.value = "";
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  });
}
