import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';

type Props = {
  pokemon: Pokemon
};

type Field = {
    value?: any,
    error?: string, 
    isValid?: boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field,
}

const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {

    const [form, setForm] = useState<Form>({
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
    })

    const history = useHistory();

    const types: number[] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ];

    const hasType = (type: number): boolean => {
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldName]: {value: fieldValue}};

        setForm({...form, ...newField})
    }

    const validateForm = () => {
        let newForm: Form = form;
    
        // Validator url
        // if(isAddForm()) {
    
        //   const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
        //   const end = ".png";
    
        //   if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
        //     const errorMsg: string = 'L\'url n\'est pas valide.';
        //     const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
        //     newForm = { ...newForm, ...{ picture: newField } };
        //   } else {
        //     const newField: Field = { value: form.picture.value, error: '', isValid: true };
        //     newForm = { ...newForm, ...{ picture: newField } };
        //   }
        // }
    
        // Validator name
        if(!/^[a-zA-Z?????? ]{3,25}$/.test(form.name.value)) {
          const errorMsg: string = 'Le nom du pok??mon est requis (1-25).';
          const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
          newForm = { ...newForm, ...{ name: newField } };
        } else {
          const newField: Field = { value: form.name.value, error: '', isValid: true };
          newForm = { ...newForm, ...{ name: newField } };
        }
    
        // Validator hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
          const errorMsg: string = 'Les points de vie du pok??mon sont compris entre 0 et 999.';
          const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
          newForm = { ...newForm, ...{ hp: newField } };
        } else {
          const newField: Field = { value: form.hp.value, error: '', isValid: true };
          newForm = { ...newForm, ...{ hp: newField } };
        }
    
        // Validator cp
        if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
          const errorMsg: string = 'Les d??g??ts du pok??mon sont compris entre 0 et 99';
          const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
          newForm = { ...newForm, ...{ cp: newField } };
        } else {
          const newField: Field = { value: form.cp.value, error: '', isValid: true };
          newForm = { ...newForm, ...{ cp: newField } };
        }
    
        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
      }

      const isTypesValid = (type: number): boolean => {
        // Cas n??1: Le pok??mon a un seul type, qui correspond au type pass?? en param??tre.
        // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir d??coch?? ce type (sinon le pok??mon aurait 0 type, ce qui est interdit)
        if (form.types.value.length === 1 && hasType(type)) {
          return false;
        }
        
        // Cas n??1: Le pok??mon a au moins 3 types.
        // Dans ce cas il faut emp??cher ?? l'utilisateur de cocher un nouveau type, mais pas de d??cocher les types existants.
        if (form.types.value.length >= 3 && !hasType(type)) { 
          return false; 
        } 
        
        // Apr??s avoir pass?? les deux tests ci-dessus, on renvoie 'true', 
        // c'est-??-dire que l'on autorise l'utilisateur ?? cocher ou d??cocher un nouveau type.
        return true;
      }

    const selectType = (type:number, e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        let newField: Field;

        if(checked) {
            const newTypes: number[] = form.types.value.concat([type]);
            newField = {value: newTypes};
        } else {
            const newTypes: number[] = form.types.value.filter((currentType: number) => currentType !== type);
            newField = {value: newTypes};
        }

        setForm({...form, ...{types: newField}})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        const isFormValid = validateForm();
        if(isFormValid) {
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value;
            history.push(`/pokemons/${pokemon.id}`);
        }

    }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                    {form.name.error && 
                        <div className="card-panel red accent-1">
                            {form.name.error}
                        </div>
                    }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {form.hp.error && 
                        <div className="card-panel red accent-1">
                            {form.hp.error}
                        </div>
                    }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">D??g??ts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {form.cp.error && 
                        <div className="card-panel red accent-1">
                            {form.cp.error}
                        </div>
                    }
                </div>



                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id="{type}" type="checkbox" className="filled-in" value="{type}" disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
