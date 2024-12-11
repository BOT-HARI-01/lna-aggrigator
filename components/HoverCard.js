import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const HoverCard = ({ src, title, content, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isSaved, setIsSaved] = useState(false); // State to track if the post is saved

  // for saving
  const handleSave = () => {
    setIsSaved(false);
    // use the local storage or better to use db to store the users saved links
    if (!isSaved) {
      alert('Post saved!');
    } else {
      alert('Post removed from saved!');
    }
  };


  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleNavigate = () => {
    window.open(link, "_blank");
  };

  return (
    <div>
      {/* Small Card */}
      <div className="card my-12" style={{ width: "25rem", cursor: "pointer" }} onClick={openModal}>
        <div className="card-body">
          <Image className="card-img-top" src={`http://localhost:3001/proxy_image?url=${encodeURIComponent(src)}`} alt="Card img cap" width={150} height={200}/>
          <h5 className="card-title" style={{ color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h5>
          {/* <p className="card-text" style={{ color: 'gray' }}>{content}</p> */}
        </div>
      </div>

      {/*Large Card */}
      {isModalOpen && (
        <div className="modal-overlay" style={styles.modalOverlay} onClick={closeModal}>
          <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image className="card-img-top" src={`http://localhost:3001/proxy_image?url=${encodeURIComponent(src)}`} alt="Card img cap" width={400} height={500} />
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>{title}</h5>
              <p className="card-text" style={{ color: 'gray', fontSize: '1rem' }}>{content}</p>

              {/* Btns */}
              <div className="d-flex justify-content-between">
                <button onClick={handleSave} className="btn btn-primary">
                  {isSaved ? 'Remove from Saved' : 'Save Post'}
                </button>
                <button onClick={handleNavigate} className="btn btn-secondary">
                  Open Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '80%',
    zIndex: 10,
    position: 'relative',
  }
};

export default HoverCard;