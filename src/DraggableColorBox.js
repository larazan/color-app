import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: "25%",
        height: "20vh",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-5.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
}

const DraggableColorBox = SortableContainer(props => {
    const { classes } = props;
    return (
        <div 
            className={classes.root} 
            style={{backgroundColor: props.color}}
        >
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    onClick={props.handleClick}
                />
            </div>
            
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);