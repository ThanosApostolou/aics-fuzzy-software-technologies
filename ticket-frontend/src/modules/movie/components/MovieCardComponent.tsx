import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { MovieListItemDto } from '../dtos/movie-list-item-dto';
import { Avatar, Badge, CardHeader, Grid, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InsightsIcon from '@mui/icons-material/Insights';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { green, red } from '@mui/material/colors';

export interface MovieCardComponentProps {
    movie: MovieListItemDto
    choice?: number;
}

//Probably have to use arrays in order to load them dynamically
const MovieCardComponent = (props: MovieCardComponentProps) => {


    //Create a custom onClick function for our ticket buttons
    const onClick = (id: string) => {
        console.log({ id })
    }
    return (
        <Card sx={{ ":hover": { transform: 'scale(1.05)', boxShadow: 3 }, transition: 'ease', borderRadius: 5, maxWidth: 500 }}>
            {props.choice != null && (
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                        {props.choice}
                    </Avatar>
                } />
            )}

            <CardMedia
                component="img"
                height="200"
                src={props.movie.imageMimePrefix + ',' + props.movie.image}
            />
            <CardContent>
                <Typography fontWeight={'bold'} gutterBottom variant="h5" component="div">
                    {props.movie.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.movie.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        <Button component={Link} to={'/events/list?movieId=' + props.movie.movieId} variant='contained' sx={{ ":hover": { backgroundColor: 'secondary' }, borderRadius: 20, backgroundColor: 'primary' }} size="small">ΠΡΟΒΟΛΕΣ</Button>
                        <Button component={Link} to={'/movies/details?movieId=' + props.movie.movieId} variant='outlined' sx={{ ":hover": { borderColor: '#920b17', color: '#920b17' }, color: '#E63946', backgroundColor: 'white', borderColor: '#E63946', borderRadius: 20, marginLeft: 1 }} size="small">ΠΛΗΡΟΦΟΡΙΕΣ</Button>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Rating">
                            <Badge badgeContent={props.movie.rating} color="primary" sx={{ marginRight: 0.5 }}>
                                <StarIcon color="action" />
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Duration">
                            <Badge badgeContent={props.movie.duration} color="primary" max={1000} sx={{ marginRight: 0.5 }}>
                                <MoreTimeIcon color="action" />
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Popularity Index">
                            <Badge badgeContent={props.movie.popularity} color="primary" max={1000} sx={{ marginRight: 1 }}>
                                <InsightsIcon color="action" />
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Year">
                            <Badge badgeContent={props.movie.year} color="primary" max={2100}>
                                <CalendarMonthIcon color="action" />
                            </Badge>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActions>
        </Card >
    )
}

export default MovieCardComponent