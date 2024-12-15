"use client"

export const MainContent = ({children, isSidebarOpen}) =>{

    console.log("Side bar val at maincontent-comp",isSidebarOpen);
    return(
        <div style={{display:"flex"}}>
            <main style={
            {
            marginLeft : isSidebarOpen ? "200px" : "60px",
            marginRight :isSidebarOpen ? "10px" : "30px",
            // padding : "20px",
            // flexGrow : "1",  
            transition : "margin-left 0.3s ease-in-out"
            }
        }>
            {children}
        </main>
        </div>
    );
};