import "./style.css";
import { setupSearch } from "./instance_search";
import { invalidURL } from "./instance_search.ts";

const params = new URLSearchParams(window.location.search);
const edit_text = document.querySelector<HTMLTextAreaElement>("#share_text");
const instance = document.querySelector<HTMLInputElement>("#instance");

function getUrl() {
  return instance!.value;
}

let share_text: string;
let default_instace: string;
let share_url: string;

if (params.has("text")) {
  share_text = params.get("text")!;
  edit_text!.value = share_text;
}

if (params.has("default")) {
  default_instace = params.get("default")!;
  instance!.value = default_instace;
}

if (params.has("link")) {
  share_url = params.get("link")!;
  edit_text!.value += "\n" + share_url;
}

function getShareText() {
  return encodeURIComponent(edit_text!.value);
}

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
  } catch (_) {
    return false;
  }
}

const share_button = document.querySelector<HTMLButtonElement>("#share_button");
setupSearch(document.querySelector<HTMLButtonElement>("#check_button")!);

share_button!.onclick = function () {
  ShareURL(true);
};

function ShareURL(url_check: boolean) {
  if (url_check && !isValidUrl("http://" + getUrl())) {
    invalidURL();
    share_button!.innerText = "Share Anyway!";
    share_button!.onclick = function (_: Event) {
      ShareURL(false);
    };
  } else {
    window.open(`https://${getUrl()}/share/?text=${getShareText()}`, "_blank");
  }
}
