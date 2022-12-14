import {IL} from "./instance_lists"

export interface MInstance{
  name:string;
  url:string;
  description:string;
  users : number;
}

const elm = document.querySelector<HTMLDivElement>("#instance_card")!;
function getapi(url : string) {

return `https://${url}/api/v2/instance`


}

function createInstanceCard(data : MInstance){
  elm.style.visibility = "visible";

  const instance_title = data.name;
  const instance_desc = data.description;
  const instance_users = data.users

  elm.innerHTML = `
    
    <h2 class="instance-title">${instance_title}</h2>
    <p class="instance-desc">${instance_desc}</p>
    <p class="instance-users">Monthly Active Users: ${instance_users}</p>
  
  `

}

function invalidURL(){
			elm.style.visibility = "visible";
			elm.innerHTML = `<h2 class="instance-title">Probably not a Mastodon Instance!</h2>`	
	
}

function fetchData(url : string){
  fetch(getapi(url)).then((data) => data.json())
    .then((data) => {
		if (data["title"].length < 1){
			invalidURL()
		return
		}
      const i : MInstance = {
        name : data["title"],
        url : data["url"],
        description:data["description"],
        users : data["usage"]["users"]["active_month"]
      }
      createInstanceCard(i)
    }).catch((_e) => {

		invalidURL()
	})
}




export function setupSearch(element: HTMLButtonElement) {
	const ielm = document.querySelector<HTMLInputElement>("#instance");

 	
	let datalist_entry : string;

	IL.forEach((item : string)=> {
		datalist_entry += `<option value=${item}/>`	
	})

	document.getElementById("instance_list")!.innerHTML = datalist_entry;
	
  
  element.addEventListener('click', () => fetchData(ielm!.value))
}
