import './style.css'
import { setupSearch} from './instance_search'

const params = new URLSearchParams(window.location.search)
const edit_text = 	document.querySelector<HTMLTextAreaElement>("#share_text");
const instance = document.querySelector<HTMLInputElement>("#instance");

function getUrl(){
	return	instance!.value;
}

let share_text : string;
let default_instace : string;
let share_url : string;




if (params.has("text")) {
    share_text = params.get("text")!;
	edit_text!.value = share_text;
}

if (params.has("default")){
	default_instace = params.get("default")!;
	instance!.value = default_instace
}

if (params.has("url")){
	share_url = params.get("url")!;
	edit_text!.value+= "\n" + share_url;
}

function getShareText(){
	return encodeURIComponent(edit_text!.value)
}


function setupWebShare(){
	if (navigator.share != undefined){
		const share_area = document.querySelector("#share_area");
		share_area!.innerHTML += `<button id="share_button_webshare">Share via app</button>`
		document.querySelector<HTMLButtonElement>("#share_button_webshare")!.onclick = async function(){
			await navigator.share({
				url : share_url,
				text : getShareText(),
				title : "_"
			});
		}
	}
	
}


setupSearch(document.querySelector<HTMLButtonElement>('#check_button')!)
setupWebShare()

document.querySelector<HTMLButtonElement>("#share_button")!.onclick = function(){
	
	window.open(`https://${getUrl()}/share/?text=${getShareText()}` , "_blank")
}

