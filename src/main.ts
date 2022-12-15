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
	if (navigator.canShare != undefined){
	if (navigator.canShare()){
		const share_area = document.querySelector("#share_area");
		share_area!.innerHTML += `<button id="share_button" onclick="prepareShare(true)">Share via app</button>`
	}
	}
	
}


setupSearch(document.querySelector<HTMLButtonElement>('#check_button')!)
setupWebShare()

document.querySelector<HTMLButtonElement>("#share_button")!.onclick = function(){
	prepareShare(false)
}



function prepareShare(webshare : boolean){
//	window.open(`https://${instance_url}/?text='+encodeURIComponent()+'&title='+encodeURIComponent(document.title)`,'das',location=no,links=no,scrollbars=no,toolbar=no,width=620,height=550);
	if (webshare){
		navigator.share(share_text)
	}else{	
	window.open(`https://${getUrl()}/share/?text=${getShareText()}` , "_blank")
	}
}
