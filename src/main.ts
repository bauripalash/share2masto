import './style.css'
import { setupSearch} from './instance_search'

const params = new URLSearchParams(window.location.search)
const edit_text = 	document.querySelector<HTMLTextAreaElement>("#share_text");

function getUrl(){
	return	document.querySelector<HTMLInputElement>("#instance")!.value;
}

let share_text : string;

if (params.has("text")) {
    share_text = params.get("text")!;
	edit_text!.value = share_text;
}

setupSearch(document.querySelector<HTMLButtonElement>('#check_button')!)

document.querySelector<HTMLButtonElement>("#share_button")!.onclick = function(){
	prepareShare()
}



function prepareShare(){
//	window.open(`https://${instance_url}/?text='+encodeURIComponent()+'&title='+encodeURIComponent(document.title)`,'das',location=no,links=no,scrollbars=no,toolbar=no,width=620,height=550);
		
	window.open(`https://${getUrl()}/share/?text=${edit_text!.value}` , "_blank")
}
