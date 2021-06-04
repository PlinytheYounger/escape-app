import './css/footer.css';


export default function Footer() {
    const barTheme = {
        backgroundColor: "#c6d7b9",
        color: "#5e8d5a",
        fontFamile: "Montserrat",
        fontSize: "20px",
        height: "10%",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }

    const linkStyle = {
        textDecoration: "none",
        color: "inherit"
    }

    return(
        <div style={barTheme}>
            <p>Email</p>
            <p><a style={linkStyle} src="https://www.linkedin.com/in/whitneyleesmith/">LinkedIn</a></p>
            <p>&copy;Whitney Smith 2021</p>
            <p><a style={linkStyle} src="https://github.com/PlinytheYounger">Github</a></p>
            <p><a style={linkStyle} src="https://whitneysmith.dev/">About Whitney</a></p>    
        </div>
    )
}