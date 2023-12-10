import React , { useEffect, useState } from 'react'
import logo from '../icons8-calendar-94.png'


const Todolist = () => {

    // function which return  data from local storage
    const getlocaldata = () => {
        const lists = localStorage.getItem("Mytodolist");
        if(lists){
            return JSON.parse(lists);
        }
        else{
            return [];
        }
    }

    // for toggle images on input tag
    const [toggle , settoggle] = useState(false);

    // for button
    const [mouse , setmouse] = useState(false);

    // for input value
    const [inputvalue,setinputvalue] = useState("");

    // Array For total items
    const [items , setitems] = useState(getlocaldata());
    console.log(typeof items ,'ig   ')

    // Function for Add Items in an array items
    const Additem = () => {
        if(!inputvalue){
            alert("kuch daal toh pehle chadarmod");
        }
        
        else if(toggle && inputvalue){
            setitems(
                items.map((element)=>{
                    if(element.id === upadteidx){
                        return {...element , name:inputvalue}
                    }
                    return element;
                })
            )
            setinputvalue("");
            settoggle(false);
            setupdateidx(null);
        }
        
        else{
            const obj_items = {
                id:new Date().getTime().toString(),
                name:inputvalue
            }
            setitems([...items , obj_items]);
            setinputvalue("")
        }
    }

    // function for delete an item
    const deleteitem = (idx) => {
        const afterdelete = items.filter((element) => {
            return element.id !== idx;
        })

        setitems(afterdelete);

    }

    // function for remove all items
    const removeall = () => {
        return setitems([]);
    }

    // index of update item
    const [upadteidx , setupdateidx] = useState("");


    // function for update an item
    const updateitem = (index) => {
        const val = items.find((element)=>{
            return element.id === index;
        });
        setinputvalue(val.name);
        settoggle(true);
        setupdateidx(index);
    }

    // Local Storage
    useEffect(()=>{
        localStorage.setItem("Mytodolist" ,JSON.stringify(items))
    },[items])


    console.log(items)

  return (
    <>
        <img src={logo} alt="" />
        <h1>Add Your List Here🤞</h1>
        <div className='relative flex mt-4 items-center'>
            <input type="text" size={45} placeholder='✍️Add Item...' className='h-10 focus:outline-none pl-4 rounded-lg' value={inputvalue} onChange={(event) => setinputvalue(event.target.value)}/>
            {toggle ? <i className='hover:text-green-300 fa-regular fa-pen-to-square absolute right-4 cursor-pointer' onClick={Additem}></i> : <i className="fa-solid fa-plus absolute right-4 cursor-pointer" onClick={Additem}></i> }
        </div>

        
           { items.map((element) => {
                return(
                    <div key={element.id} className='flex bg-blue-400 w-96 rounded-xl h-10 mt-4 items-center justify-between i1 cursor-pointer'>
                        <h1 className='pl-4'>{element.name}</h1>
                        <div className='pr-6 space-x-6'>
                            <i className='i2 fa-regular fa-pen-to-square ' onClick={() => updateitem(element.id)}></i>
                            <i className='i3 fa-sharp fa-solid fa-trash' onClick={() => deleteitem(element.id)}></i>
                        </div>
                    </div>
                 )
             })}
        

      <button className='px-8 py-2 rounded-lg hover:bg-blue-400 bg-white mt-4' onMouseEnter={() => setmouse(true)} onClick={removeall} onMouseLeave={() => {setmouse(false)}}>{mouse?"REMOVE ALL":"CHECK LIST"}</button>
    </>
  )
}

export default Todolist