import './Crud.css'
import { getPost , deletePost, postData, updataData} from './Apidata'
import { useEffect, useState } from 'react';


function Crud() {
    const [data, setData] = useState([]);
    const [updata, setUpdata] = useState({});
    const [addData, setAddData] = useState({
        title: "",
        body: "",
    });

    let isEmpty = Object.keys(updata).length ===0;

    const handelChange=(e)=>{
        const {name, value} = e.target;
        
        setAddData((prev)=>{
            return{
                ...prev,
                [name]: value,
            };
        });
    }

    const handelSubmit =(e)=>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "Add"){
            addPostData();
        }else if (action === "Edit") {
            updatPostData();
        } 
    }

    const updatPostData = async()=>{
        try {
            const res = await updataData(updata.id, addData);
            console.log(res);

            setData((prev)=>{
                return(
                    prev.map((curElem)=>{
                        return curElem.id === updata.id ? res.data : curElem;
                    })
                );
            });
            setAddData({title:"", body:""});
            setUpdata({});

        } catch (error) {
            console.log(error);
        }
    }


    const addPostData =async()=>{
        const res = await postData(addData);
        console.log(res);
        if((res.status === 201)){
            setData([...data, res.data]);
            setAddData({title:"", body:""});
        }
    }

    const getPostData = async () =>{
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    }

    useEffect(()=>{
        getPostData();
    },[]);

    const handeldelete = async(id) =>{
        try {
            const res = await deletePost(id);
            if(res.status === 200){
                const newUpdatedPost = data.filter((curPost)=>{
                    return curPost.id != id;
                });
                setData(newUpdatedPost);
            }   
        } catch (error) {
            console.log(error);
        }
    }

    const handelUpdat =(curElem)=>{
        setUpdata(curElem);
    } 

    useEffect(()=>{
        updata && setAddData({
            title: updata.title || "",
            body : updata.body || "",
        })
    },[updata])

  return (
    <>
    <section>
        <form onSubmit={handelSubmit}>
            <div className='tital'>
                <label htmlFor="title"></label>
                <input
                 className='tital-in'
                 type="text"
                 name="title" 
                 id="title"
                 value={addData.title}
                 onChange={handelChange}
                 autoComplete='off'
                 placeholder='Add Title' />
            </div>

            <div className='body'>
                <label htmlFor="body"></label>
                <input 
                 className='body-in'
                 type="text"
                 name="body"
                 id="body"
                 value={addData.body}
                 onChange={handelChange}
                 autoComplete='off'
                 placeholder='Add Post'
                 />
            </div>
            <button className='Add-btn' type='submit' value={isEmpty ? "Add" : "Edit"}>
                {isEmpty ? "Add" : "Edit"}
                </button>
        </form>
    </section>

      <section className='section-post'>
        <ol>
            {
                data.map((curElem,index)=>{
                    const {id,title, body} = curElem;
                    return(
                        <li key={index}>
                            <p>Title: {title}</p>
                            <p>Body: {body}</p>
                            <button
                             className='Edit-btn' onClick={()=>handelUpdat(curElem)}>Edit</button>
                            <button className='Delete-btn' onClick={()=>handeldelete(id)}>Delete</button>
                        </li>
                    );
                })
            }
        </ol>
      </section>
    </>
  )
}

export default Crud
