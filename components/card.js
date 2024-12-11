import Image from "next/image";
import Link from "next/link";
import Button from "./button";
const Card = ({ src, title, content, link }) => {
  return (  
    // card is from bootstrap
    <div className="card my-4 w-1/3  p-1" style={{ width: "25em" }}>
      <div className="card-body" style={{color : 'grey'}}>
        
        {/* using the image tag of react that has the strict rules to disallow getting the images from the 3rd-party sites.
        unlike the <img> tag we can use img but code shows the warning of depreciation, so wo by pass the rules we are using the python code to send the images source link to it and let the next app think it is just a normal links rather than a 3party site link and then use it to display the image. */}

        <Image className="card-img-top" src={`http://localhost:3001/proxy_image?url=${encodeURIComponent(src)}`} alt="Card img cap" width={150} height={200}/>

        <h5 className="card-title" style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h5>
        {/* <p className="card-text" style={{ color: 'gray' }}>{content}</p> */}
        <Link href={link} target="_blank" style={{ textDecoration: 'none' }}>
          {/* <Button/> */}
        </Link>

      </div>
    </div>
  );
};

export default Card;



