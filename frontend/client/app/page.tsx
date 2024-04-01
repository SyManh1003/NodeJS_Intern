"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import imgLogo from "../public/Logo_Intern_NodeJS.png"
import imgAvatar from "../public/avatar.png"

interface Data {
  likes?: Number;
  dislikes?: Number;
  _id?: String;
  title?: String;
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  const [disableButtons, setDisableButtons] = useState(false); // Control like & dislike

  const fetchedRef = useRef(false);

  const likeJoke = async (jokeId:any) => {
    // const userId = getUserIdFromSession();
    const sessionId = sessionStorage.getItem("sessionId");

    try {
      const res = await fetch("http://localhost:8000/joke/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify({ sessionId, jokeId, voteType: 1 })
        body: JSON.stringify({ sessionId, jokeId, voteType: 1 })

      });
      const data = await res.json();
      if(!data) {
        setData({ title: "That's all the jokes for today! Come back another day!"}); // Nếu data là false, hiển thị thông báo
        // console.log(data);
        setDisableButtons(true); 
        return;
      }

      sessionStorage.setItem("sessionId", data.updatedSessionIds);

      setData(data.newJoke);
      
      // sessionStorage.setItem("sessionId", data?._id);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const dislikeJoke = async (jokeId:any) => {
    // const userId = getUserIdFromSession();
    const sessionId= sessionStorage.getItem("sessionId");

    try {
      const res = await fetch("http://localhost:8000/joke/vote", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId, jokeId, voteType: 0 })
      });
      const data = await res.json();
      if(!data) {
        setData({ title: "That's all the jokes for today! Come back another day!"});
        // console.log(data);
        setDisableButtons(true); 
        return;
      }

      sessionStorage.setItem("sessionId", data.updatedSessionIds);

      setData(data.newJoke);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/joke", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data.updatedSessionIds);
      setData(data);
      // save JokeId into session
      if(data?.updatedSessionIds) {
        sessionStorage.setItem("sessionId", data.updatedSessionIds);
      }else{
        sessionStorage.setItem("sessionId", data._id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchData();
      fetchedRef.current = true;
    }

  }, []);

  return (
    <>
      <header className='h-[100px] container '>
        <div className="flex justify-between m-auto w-full">
          <div className="logo text-base py-[10px] pl-[50px]">
          <Image className="m-auto"
            src={imgLogo}
            width={80}
            height={80}
            alt="Picture of the author"
          />
          </div>

          <div className="avatar text-base py-[10px] pr-[50px]">
            <div className="flex">
              <div className="info w-full py-[15px] pr-[20px]">
                <p className="m-0 text-gray-500">Handicrafted by</p>
                <p className="m-0 float-end">Jim HLS</p>
              </div>
              <Image className="m-auto"
                src={imgAvatar}
                width={80}
                height={80}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
      </header>

      <div className='banner bg-[#22c55e] h-[250px] flex flex-col text-center items-center justify-center'>
        <h1 className="font-bold text-white">A joke a day keeps the doctor away</h1>
        <p className="font-medium text-white">If you joke wrong way, your teeth have to to pay. (Serious)</p>
      </div>

      <div className="content bg-slate-50 h-[380px]">
        <div className="container flex flex-col items-center justify-center py-[50px]">
          <div className="content-body mb-[50px] px-[100px] text-[18px] h-[120px]">
            <p>{data?.title}
            </p>
          </div>

          <hr className="w-[60%] border-slate-400"/>
          
          <div className="content-vote flex w-100 justify-center gap-4">
            <button onClick={() => {likeJoke(data?._id)}} className={`bg-blue-600 py-[15px] px-[80px] text-[white] ${disableButtons ?'cursor-not-allowed opacity-50' : ''}`}>
              This is Funny!
            </button>
            <button onClick={() => {dislikeJoke(data?._id)}} className={`bg-green-600 py-[15px] px-[80px] text-[white] ${disableButtons ? 'cursor-not-allowed opacity-50' : ''}`}>
              This is not Funny.
            </button>
          </div>
        </div>
      </div>
      <hr className="m-auto border-1" />
      <footer className="h-[200px] flex flex-col text-center items-center justify-center container">
        <p className="w-[1000px] text-gray-500">This website is created as part of Hlsolutions program. The materials contained on this website are provided for general
        information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy of any particular statement and
        accepts no liability for any loss or damage which may arise from reliance on the information contained on this site.</p>

        <span>Copyright 2021 HLS</span>
      </footer>
    
    </>
    
  );
}
