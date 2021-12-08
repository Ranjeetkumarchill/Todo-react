import React,{useState,useEffect} from 'react'
import "./style.css";

//get the local storage data back
const getLocalName=()=>{
    const lists=localStorage.getItem("mytodoname");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputname,setInputName]=useState("");
    const[names,setNames]=useState(getLocalName());
    const[isEditName,setIsEditName]=useState("");
    const[toggleButton,setToggleButton]=useState(false);
    const addName=()=>{
        if(!inputname){
            alert("please fill the name");

        }
        else if(inputname && toggleButton ){
            setNames(names.map((curElem)=>{
                if(curElem.id===isEditName)
                {
                    return {...curElem,name:inputname};
                }
                return curElem;
            }));
            setInputName([])
 setIsEditName(null);
 setToggleButton(false);
        }
        else{
            const myNewName={
                id:new Date().getTime().toString(),
                name:inputname,
            };
            setNames([...names,myNewName]);
            setInputName("");
        }

    }

    //edit name....
const editName=(index)=>{
    const names_todo_edited=names.find((curElem)=>{
        return curElem.id===index;
    });
    setInputName(names_todo_edited.name)
 setIsEditName(index);
 setToggleButton(true);
}


//   how to delete

const deleteName=(index)=>
{
    const updatedNames=names.filter((curElem)=>{
        return curElem.id !== index;
    });
    setNames(updatedNames);

};


    // remove all 

    const removeAll=()=>{
        setNames([]);
    }


    // adding local storage
    useEffect(()=>
    {
        localStorage.setItem("mytodoname",JSON.stringify(names));
    },[names]);
    return (
        <>
        
           <div className="main-div">
               <div className="child-div">
                   <figure>
                       <img src="./images/todo.png" alt="todologo" />
                       <figcaption>Add your name here 👈</figcaption>
                   </figure>
                   <div className="addItems">
                       <input type="text" placeholder="✍ Add name" className="form-control" value={inputname} onChange={(e)=>setInputName(e.target.value)}/>
                       {toggleButton ?(
                       <i className="far fa-edit add-btn" onClick={addName}></i>
                       ):(
                       <i className="fa fa-plus add-btn" onClick={addName}></i>)}
                       
                   </div>
                     {/* show our name */}
                     <div className="showItems">
                         {names.map((curElem)=>{
                             return(
                                 <div className="eachItem" key={curElem.id}>
                                 <h3>{curElem.name}</h3>
                                 <div className="todo-btn">
                                 <i className="far fa-edit add-btn" onClick={()=>editName(curElem.id)}></i>
                                 <i className="far fa-trash-alt add-btn" onClick={()=>
                                deleteName(curElem.id)} ></i>

                                 </div>
                         </div>
                             )


                         })}
                         

                     </div>


                        {/* remove all button */}
                   <div className="showItems">
                       <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>

                   </div>

               </div>
               </div> 
        </>
    )
}

export default Todo
