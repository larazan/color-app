import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from './DraggableColorList';
import seedColors from './seedColors';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PaletteForm(props) {
    
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("teal");
    const [newName, setNewName] = React.useState("");
    const [colors, setColors] = React.useState([{ color: "blue", name: "blue"}, { color: "red", name: "red"}]);
    const [seed2Colors, setSeedColors] = React.useState(seedColors);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
          colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );
    })

    const updateCurrentColor = (newColor) => {
        console.log(newColor);
       
        setCurrentColor(newColor.hex);
        console.log(currentColor);
    }

    const addNewColor = () => {
        const newColor = {
            color: currentColor,
            name: newName
        };
        
        setColors([...colors, newColor]);
        console.log(newColor);
    }

    const handleChange = (evt) => {
        setNewName(evt.target.value);
    }

    const handleSubmit = () => {
       console.log(seed2Colors);
      let newName = "New Test Palette";
      const newPalette = {
        paletteName: newName, 
        id: newName.toLowerCase().replace(/ /g, "-"),
        colors: [{ color: "blue", name: "blue"}, { color: "red", name: "red"}]
      }
      // props.savePalette(newPalette);
      setSeedColors([...seed2Colors, newPalette]);
      props.history.push('/');
    }

    const removeColor = (colorName) => {
      this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName)
      });
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
      this.setState(({ colors }) => ({
        colors: arrayMove(colors, oldIndex, newIndex)
      }));
    };

    useEffect(() => {
      console.log(seed2Colors);
    })

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            color="default"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                  Create a Palette
              </Typography>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
              >
                Save Palette
              </Button>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
            <Typography variant="h4">Design your palette</Typography>
            <div>
                <Button variant="contained" color="secondary">
                Clear Palette
                </Button>
                <Button variant="contained" color="primary">
                Random Color
                </Button>
            </div>
            <ChromePicker 
                color={currentColor}
                onChangeComplete={updateCurrentColor}
            />
            <ValidatorForm onSubmit={addNewColor}>
                <TextValidator 
                    value={newName}
                    onChange={handleChange}
                    validators={["required", "isColorNameUnique"]}
                    errorMessages={["this field is required", "Color name must be unique"]}
                />
                <Button 
                    variant="contained"
                    type="submit" 
                    color="primary" 
                    style={{ backgroundColor:currentColor }}
                >
                    Add Color
                </Button>
            </ValidatorForm>
        </Drawer>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <DraggableColorList 
                  colors={colors}
                  removeColor={removeColor}
                  axis="xy"
                  onSortEnd={onSortEnd}
                />
        </main>
        </div>
    );
}