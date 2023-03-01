var sidebar=document.getElementById("sidebar")

var user_data=JSON.parse(localStorage.getItem("user"))
console.log(user_data)

var img=document.createElement("img")
img.setAttribute("id","image")
img.src=user_data.image

var namex=document.createElement("h2")
namex.setAttribute("id","name")
namex.innerText=user_data.name

var email=document.createElement("h3")
email.setAttribute("id","email")
email.innerText=user_data.email

var country=document.createElement("h3")
country.setAttribute("id","country")
if(user_data.country=="in"){
    country.innerText="India"
}
else if(user_data.country=="ch"){
    country.innerText="China"
}
else if(user_data.country=="nz"){
    country.innerText="Newzealand"
}
else if(user_data.country=="us"){
    country.innerText="USA"
}
else if(user_data.country=="uk"){
    country.innerText="UK"
}

sidebar.append(img,namex,email,country)

async function Search(e){
    if(e.key=="Enter"){
        let query=document.querySelector("#search").value
        const url=`https://masai-mock-api-2.herokuapp.com/news?q=${query}`;
        let res=await fetch(url);
        let data=await res.json();
        let news=data.articles
        console.log(news)
        document.querySelector("#search").value=null;
        append(news,"#news_container")
    }
}

async function regionalNews(query){
    const url=`https://masai-mock-api-2.herokuapp.com/news/top-headlines?country=${query}`;
    let res=await fetch(url);
    let data=await res.json();
    let news=data.articles
    append(news,"#news_container")
}

function append(news,id){
    let container=document.querySelector(id);
    container.innerHTML=null;
    news.map((ele)=>{
        let child_div=document.createElement("div");
        child_div.setAttribute("class","news");
        child_div.addEventListener("click",()=>{
            news_details(ele);
        })
        let nati_div=document.createElement("div");

        let img=document.createElement("img");
        img.src=ele.urlToImage;

        let Title=document.createElement("h3");
        Title.innerText=ele.title

        let Description=document.createElement("p");
        Description.innerText=ele.description;

        nati_div.append(Title,Description)
        child_div.append(img,nati_div);
        container.append(child_div)

    })
};

function news_details(ele){
    var img=event.target.parentNode.firstChild;
    console.log()
    var obj={}
    window.location.href="news.html";
}

let Default_Country="in"
regionalNews(Default_Country)