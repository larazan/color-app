import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import seedColors from './seedColors';

import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    state = { 
        palettes2: '',
    }

    componentDidMount() {
        console.log(this.state.palettes2);
    }

    gotToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    updateHandle = () => {
        console.log('di klik');
        let newName = "New Test Palette";
        const newPalette = {
            paletteName: newName, 
            id: "new-test-palette",
            colors: [{ color: "blue", name: "blue"}, { color: "red", name: "red"}]
        };
        this.setState({
            palettes2: newName
        });
        console.log(this.state.palettes2);
     }

    render() {
        const { palettes, classes } =  this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h2>React Colors</h2>
                        {/* <button onClick={this.updateHandle}>test</button> */}
                        <Link to="/palette/new">Create new palette</Link>
                        <Link to="/palette/form">Create palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map((palette,i) => (
                            <MiniPalette 
                                key={i}
                                {...palette} 
                                handleClick={() => this.gotToPalette(palette.id)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);