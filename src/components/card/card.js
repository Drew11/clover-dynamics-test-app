import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400,
        margin: '0 0 20px 20px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },

}));

export default function CardStyled( props ) {
    const {
        imageSrc,
        cameraName,
        earthDate
    } = props;

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                title={cameraName}
                subheader={earthDate}
            />
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Full size photo follow the <Link href={imageSrc}
                                                     target="_blank"
                >
                    link</Link>
                </Typography>
            </CardContent>

        </Card>
    );
}

