apiurl = "https://60f66a9b18254c00176e0274.mockapi.io/users/"
createform()
getuserdata()

async function getuserdata()
{
    let resp = await fetch (apiurl);
    let data = await resp.json()
    console.log(data)
    createtable(data);
}

function createform()
{
    let divt = document.createElement("div")
    divt.setAttribute("class",'container')
    
    let divr = document.createElement('div')
    divr.setAttribute('class','row')

    let divc1 = document.createElement('div')
    divc1.setAttribute('class',"col-6")
    form1 = document.createElement("form")
    
    divf1 = document.createElement('div')
    divf1.setAttribute('class','form-group')
    divf2 = document.createElement('div')
    divf2.setAttribute('class','form-group')
    let inputh = document.createElement('input')
    inputh.type = "hidden"
    inputh.setAttribute("id","id")
    let label1 = document.createElement('label')
    label1.innerHTML = 'Name'
    label1.setAttribute('for',"name")
    let input1 = document.createElement('input')
    input1.type = "text"
    input1.setAttribute("id","name")
    input1.setAttribute("class","form-control")
    let label2 = document.createElement('label')
    label2.innerHTML = 'Email'
    label2.setAttribute('for','email')
    let input2 = document.createElement('input')
    input2.type = "text"
    input2.setAttribute("id","email")
    input2.setAttribute("class","form-control")
    
    divf1.append(label1,input1)
    divf2.append(label2,input2)

    
    let btn = document.createElement('button')
    btn.type = "button"
    btn.setAttribute('class',' btn btn-primary')
    btn.addEventListener("click",() => createuser())
    btn.innerHTML= "Submit"

    let btn1 = document.createElement('button')
    btn1.type = "button"
    btn1.setAttribute('class',' btn btn-warning')
    btn1.addEventListener("click",() => edituser())
    btn1.innerHTML= "Update"
    
    form1.append(divf1,divf2,inputh,btn,btn1)
    divc1.append(form1)
    let divc2 = document.createElement('div')
    divc2.setAttribute('class',"col-6")
    let tb  = document.createElement("table")
    tb.setAttribute('class','table')
    let thead =  document.createElement("thead")
    thead.setAttribute('class',"thead")
    let tr = document.createElement("tr")
    let th1  = document.createElement("th")
    th1.innerHTML = "Id"
    let th2  = document.createElement("th")
    th2.innerHTML = "Name"
    let th3  = document.createElement("th")
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id','tbody')
    th3.innerHTML = "Email"
    thead.append(tr,th1,th2,th3)
    tb.append(thead,tbody)
    divc2.append(tb)
    divr.append(divc1,divc2)
    divt.append(divr) 
    document.body.append(divt)
}

function createtable(data){ 
    let tBody = document.getElementById("tbody");

    data.forEach((element) => {
        tBody.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td> <a class='text-warning'  onclick="getuserid(${element.id})">Edit</a> | 
            <a class='text-danger' onclick="deleteuser(${element.id})">Delete</a>
            </td>
        </tr>
        `;
    });

}

async function createuser()
{
    try{
        let name = document.getElementById("name").value
        let email = document.getElementById("email").value
        if (name !== "" && email !== "")
        {
            //console.log(name + email)
            let resp = await fetch(apiurl, {
            method: "POST",
            body: JSON.stringify({name,email}),
            headers: {
                "Content-Type": "application/json",
            },
            })
            document.querySelector("form").reset()
            alert("user created")
            document.getElementById("tbody").innerHTML=""
            getuserdata()
        }
        else
        {
            alert("name and email must be filled")    
        }
    
    }catch(error)
    {
        console.log(error)
    }
}

async function deleteuser(id)
{
    try{
        let resp = fetch(apiurl + id,{
            method : "DELETE",   
        });
        alert("user deleted")
        document.getElementById("tbody").innerHTML=""
        getuserdata()
    }
    catch(error){

    }
}

async function edituser()
{
    let name  = document.getElementById("name").value 
    let email = document.getElementById("email").value
    let id = document.getElementById("id").value
    if (id !== "" && name !== "" && email !== "")
    {
        await fetch(apiurl + id,{
            method: "PUT",
            body: JSON.stringify({name,email}),
            headers: {
                "Content-Type" : "application/json"
            },
        });
        //console.log(id)
        document.querySelector("form").reset()
        alert("user updated")
        document.getElementById("tbody").innerHTML=""
        getuserdata()
    }
    else
    {
        alert("name and email must be filled")
    }
}

async function getuserid(id)
{
    try{
        let resp = await fetch(apiurl + id)
        let data = await resp.json()
        document.getElementById("name").value = data.name
        document.getElementById("email").value = data.email
        document.getElementById("id").value = data.id
        //    return data
    }
    catch(error)
    {
        console.log(error)
    }
}