'use client'
import { useState, useEffect, useRef} from "react";
import Card from "@/components/card";
import fetchBlog from "./api/extract_link";
import fetchLinks from "./api/links_Fetch";
import HoverCard from "@/components/HoverCard";
import { ParentComponent } from "@/components/sidebar_resize";
// import { ParentComponent } from "@/components/sidebar_resize";


export default function Home() {
  const[siteLinks,setSiteLinks] = useState([]);
  const[cardData,setCardData] = useState([]);
  const loadedLinks = useRef(new Set());
  const loadref = useRef(false);
  
  // const[loading,setLoading] = useState(false); 

  // const blogurl = "https://medium.com/@loseheart110/pros-and-cons-of-artificial-intelligence-b8b9d01de85d";
  
  // Function used to initially fetch the data regarding to the user initially when the page is loaded.
  useEffect(() => {
    const loadLinks = async () => {
      const data = await fetchLinks('programming');
      
      console.log("fetchLinks response:", data);
    
        setSiteLinks(data);
    };  

    loadLinks();
  }, [])

  // After fetching the links the cards has to be loaded so the function iterates through the sitelinks and calls the fetchblog
  // which extracts the links and return link, image, title, content
  // A list is made to store all teh data of the cards that are extracted and use later to prepare the card for display
  useEffect(() => {
    // if (siteLinks.length === 0) return;
    const loadcard = async () => {
      const allcards = [];
      for(let i = 0; i < siteLinks.length; i++){
        const link = siteLinks[i];
        if(loadedLinks.current.has(link)) continue;

        loadedLinks.current.add(link);
        const data = await fetchBlog(link);
        if(data){
            const newcard = {
            src : data.image_url,
            title : data.title,
            content: data.content,
            link: link,
          };
          console.log(newcard);
          setCardData(prevcards=> [...prevcards,newcard]);
        }
      }
    };

    loadcard();
  },[siteLinks]);//iterates throught the end of site links

  // use ref is used so that the values can be mutable here can track the loading and the scrolling of the page.
  // using the state variables causes the loading where as the ref takes out the problem of re-rendering.

  // this function handles the scrolling of the page of the page is scrolled then the function loadmore is called this fetches the new links agein .
  useEffect(() => {
    const handleScroll = () => {
      if (loadref.current) return; 
      //
      const bottom = document.documentElement.scrollHeight -  document.documentElement.scrollTop - window.innerHeight < 1 ;
      if (bottom) {
        loadref.current = true; 
        const loadMore = async () => {
          const newLinks = await fetchLinks('python'); 
          setSiteLinks(prevlinks =>{
            const unqlinks = newLinks.filter(links => !prevlinks.includes(links));
            return [...prevlinks,...unqlinks];
          }); 
          loadref.current = false; 
        };
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="row">
      {cardData.length > 0 ? (
          cardData.map((card, index) => (
            <HoverCard
              key={index}  
              src={card.src}
              title={card.title}
              content={card.content}
              link={card.link}
            />
          ))
        ) : (
          <p>Loading...</p> 
        )}
        {/* {cardData ? (
          <Card
            src={cardData.src}
            title={cardData.title}
            content={cardData.content}
            link={cardData.link}
          />
        ) : (
          <p>Loading...</p> 
        )} */}
        {/* <Card
          src ="https://miro.medium.com/v2/resize:fit:640/format:webp/1*YUIhHmZyuEn92w2azqpfXg.jpeg"
          title={'eewewe'}
          content={'askjdjb asgdk'}
          link={"https://medium.com/@loseheart110/pros-and-cons-of-artificial-intelligence-b8b9d01de85d"}
        /> */}
      </div>
    </div>
  );
}

// Current limitations || problems

/*  The cards are loaded then stored in list  all are fetched at once and then they are displayed at one which is time taking
      i. To implement the continuous loading by changin loadcard function to render each card when made --- (done)
    Currently the code takes only one paramater for fetching
      i. To ensure the code accepts the multiple arguments or a list and fetch the articles and links.
    Current the links fetched are above for A paritcular topic
      i. reduce the links fetching a particular topic more than 5 links from each site and ensure all are unique and all are of  different topics (different tags that are use for fetching)
    MAIN:
      The interface should manitain a local storage that enables the veri of uses perv login and directly show loads the preferences ELSE 
        0. If use has any pref just loggin or if no pref show default refs (make some default refs now).
        i. if the user is old and logged in directly load page
        ii. Use is old has pref in local storage load page
      
      * There is no tags displayed to store the prefs
          i. show a page to select the refs by the user and store them.
            implement local storage -- db later we will see it.
            
*/