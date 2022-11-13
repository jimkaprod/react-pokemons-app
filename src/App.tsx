import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonList from './pages/pokemon-list';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div>
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route exact path="/pokemons/:id" component={PokemonsDetail} />
                    <Route exact path="/pokemons/edit/:id" component={PokemonEdit} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;