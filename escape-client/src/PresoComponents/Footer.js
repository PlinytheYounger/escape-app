import './css/footer.css';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';

export default function Footer() {
    const barTheme = {
        backgroundColor: "#c6d7b9",
        color: "#5e8d5a",
        fontFamily: "Montserrat",
        fontSize: "20px",
        height: "10vh",
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
        <Grid container style={barTheme}>
            <Grid item xs sm med lg>
                <EmailIcon /> 
            </Grid>
            <Grid item xs sm med lg>
            <a style={linkStyle} src="https://www.linkedin.com/in/whitneyleesmith/"><LinkedInIcon /></a>
            </Grid>
            <Grid item xs sm med lg>
            <p>&copy;Whitney Smith 2021</p>
            </Grid>
            <Grid item xs sm med lg>
            <a style={linkStyle} src="https://github.com/PlinytheYounger"><GitHubIcon /></a>
            </Grid>
            <Grid item xs sm med lg>
            <a style={linkStyle} src="https://whitneysmith.dev/"><InfoIcon /></a>    
            </Grid>
        </Grid>
    )
}