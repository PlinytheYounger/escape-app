import './css/footer.css';

export default function Footer() {
    const barTheme = {
        backgroundColor: "#c6d7b9",
        color: "#5e8d5a",
        fontFamile: "Montserrat",
        fontSize: "20px",
        height: "10vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }

    return(
        <div style={barTheme}>
            <p>Email</p>
            <p>LinkedIn</p>
            <p>&copy;Whitney Smith 2021</p>
            <p>Github</p>
            <p>About Whitney</p>    
        </div>
    )
}