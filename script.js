const platforms = {
  ChatGPT: {
    feature: "Custom GPT",
    storage: "Knowledge",
    appUrl: "https://chatgpt.com/gpts",
    guideUrl: "https://help.openai.com/en/articles/8554397-creating-and-editing-gpts",
    guideLabel: "OpenAI’s Custom GPT instructions",
    steps: [
      "On the web, open Explore GPTs.",
      "Select Create.",
      "Name it “Your Name’s Writing Style.”",
      "Upload your writing samples under Knowledge.",
      "Add the core writing rules under Instructions.",
      "Test it in Preview, refine it, then select Create.",
      "Open your custom GPT and start a new chat whenever you want to write in your style."
    ],
    note: "Knowledge holds your writing samples. Instructions explain how the assistant should use them."
  },
  Gemini: {
    feature: "Custom Gem",
    storage: "Knowledge",
    appUrl: "https://gemini.google.com/",
    guideUrl: "https://support.google.com/gemini/answer/15146780?co=GENIE.Platform%3DDesktop&hl=en",
    guideLabel: "Google’s Gemini Gems instructions",
    steps: [
      "Open Gemini and select Gems or Explore Gems.",
      "Select New Gem.",
      "Name it “Your Name’s Writing Style.”",
      "Paste the core writing rules into the instructions.",
      "Under Knowledge, select Add files.",
      "Upload samples from your computer or Google Drive.",
      "Test it in Preview, refine it, then select Save.",
      "Open your custom Gem and start a new chat whenever you want to write in your style."
    ],
    note: "A Google Drive sample can stay current when the document changes. Ask for a topic, audience, length, and key points each time."
  },
  Claude: {
    feature: "Project",
    storage: "Project Knowledge",
    appUrl: "https://claude.ai/",
    guideUrl: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects",
    guideLabel: "Anthropic’s Claude Projects instructions",
    steps: [
      "Open Claude and select Projects.",
      "Create a project called “Your Name’s Writing Style.”",
      "Add your samples to Project Knowledge.",
      "Select Set project instructions.",
      "Paste in the core writing rules and save them.",
      "Start a new chat inside the project whenever you want to write."
    ],
    note: "Everything in Project Knowledge is available across chats in that project. Project instructions guide how Claude responds."
  }
};

const tabs = [...document.querySelectorAll("[data-platform]")];
const feature = document.querySelector("#platform-feature");
const storage = document.querySelector("#platform-storage");
const stepList = document.querySelector("#platform-steps");
const note = document.querySelector("#platform-note");
const guideLink = document.querySelector("#guide-link");
const guideLabel = document.querySelector("#guide-label");
const platformLink = document.querySelector("#platform-link");

function selectPlatform(name) {
  const current = platforms[name];
  tabs.forEach((tab) => {
    const selected = tab.dataset.platform === name;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });

  feature.textContent = current.feature;
  storage.textContent = current.storage;
  stepList.replaceChildren(...current.steps.map((step, index) => {
    const item = document.createElement("li");
    const number = document.createElement("span");
    const copy = document.createElement("p");
    number.textContent = String(index + 1);
    copy.textContent = step;
    item.append(number, copy);
    return item;
  }));
  note.textContent = current.note;
  guideLink.href = current.guideUrl;
  guideLabel.textContent = current.guideLabel;
  platformLink.href = current.appUrl;
  platformLink.firstChild.textContent = `Open ${name} `;
}

tabs.forEach((tab) => tab.addEventListener("click", () => selectPlatform(tab.dataset.platform)));
selectPlatform("ChatGPT");

const instructionText = [...document.querySelectorAll("#instruction-text p")]
  .map((paragraph) => paragraph.childNodes[1].textContent.trim())
  .join("\n\n");
const copyButton = document.querySelector("#copy-instructions");

function fallbackCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

copyButton.addEventListener("click", async () => {
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(instructionText);
    else fallbackCopy(instructionText);
  } catch {
    fallbackCopy(instructionText);
  }

  copyButton.innerHTML = "Copied! <b>✓</b>";
  window.setTimeout(() => { copyButton.innerHTML = "Copy text <b>□</b>"; }, 6000);
});
