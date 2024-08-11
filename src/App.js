import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Filter from './Components/Filter';
import Cards from './Components/Cards';
import { apiUrl, filterData } from './data';
import Spinner from './Components/Spinner';
import { toast } from 'react-toastify';


const App = () => {
  const [courses , SetCourses] = useState(null);
  const [loading, SetLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title)

  async function fetchdata() {
    SetLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //output-->
      SetCourses(output.data);

    }
    catch(error){
      toast.error("Network mein koi dikkat nahi hai ");

    }
    SetLoading(false);
    
  }

  useEffect(() =>{
    fetchdata();
  }, [])


  return (
    <div className="min-h-screen flex flex-col bg-slate-500">
      <div>
        <Navbar/>
      </div>
    <div className='bg-slate-500'>
      <div>
        <Filter 
        filterData={filterData}
        category={category}
        setCategory={setCategory} 
        />
      </div>
      <div className='w-11/12 max-w-[1200px]
      mx-auto flex flex-wrap justify-center min-h-[50vh]'>
      {
         loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
      }
      </div>
    </div>

           
    </div>
  ); 
};
export default App;
