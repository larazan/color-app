import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import PaletteForm from './PaletteForm';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  componentDidMount() {
    console.log(this.state.palettes);
  }

  savePalette(newPalette) {
    console.log(newPalette);
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    });
  }

  render() {
    return (
      <Switch>
        <Route 
          exact
          path="/palette/form"
          render={routeProps => (<PaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />)}
        />
        <Route 
          exact 
          path="/palette/new" 
          render={(routeProps) => (
            <NewPaletteForm 
              savePalette={this.savePalette} 
              palettes={this.state.palettes}
              {...routeProps} 
            />
          )}
        />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )} 
        />
        <Route 
          exact
          path='/palette/:id'
          render={
            routeProps => <Palette palette={
              generatePalette(this.findPalette(routeProps.match.params.id)
            )} />
          }
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={
            routeProps => 
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={
                generatePalette(this.findPalette(routeProps.match.params.paletteId)
              )} 
            />
          }
        />
      </Switch>
      // <div>
        
      //   <Palette palette={generatePalette(seedColors[2])} />
      // </div>
    )
  }
}

export default  App;