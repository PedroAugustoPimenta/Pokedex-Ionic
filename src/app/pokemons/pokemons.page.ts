import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonsService } from './pokemons.service';
import { Pokemons } from './pokemons.model';
import _ from 'lodash';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {

  aux: any;
  pokemons: Pokemons;
  ListaPokemons: Pokemons[];
  queryText: String;
  TodosPokemon: any;
  desativar: boolean = true;
  //infite scroll//
  PokemonPage: any[];
  private index: number = 0;
  private readonly offset: number = 10;
  //
  constructor(private pokemonsService: PokemonsService, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    let receber = await this.pokemonsService.getJSON();
    this.aux = receber;
    this.ListaPokemons = this.aux;
    this.TodosPokemon = this.ListaPokemons;

    this.PokemonPage = this.ListaPokemons.slice(this.index, this.offset + this.index);
    // this.index = 0
    // this.offset = 10;
    this.index += this.offset

  }

  filterPokemon(pok: any) {
    let val = pok.target.value;
    if (val && val.trim() != '') {
      this.ListaPokemons = _.values(this.TodosPokemon);
      this.PokemonPage = this.ListaPokemons.filter((pokemon) => {
        return (pokemon.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.index = 0

      this.PokemonPage = this.ListaPokemons.slice(0, 10);;
    }
  }

  filterType(pok: any) {
    console.log(pok)
    this.desativar = false;
    document.getElementById('infinite').style.display = "none";
    let val = pok;
    if (val && val.trim() != '') {
      this.ListaPokemons = _.values(this.TodosPokemon);
      this.PokemonPage = this.ListaPokemons.filter((pokemon) => {
        if (pokemon.type[0 + 1] != undefined) {
          return (pokemon.type[0 + 1].toLowerCase().indexOf(val.toLowerCase()) > -1) || (pokemon.type[0].toLowerCase().indexOf(val.toLowerCase()) > -1);;
        } else {

          return (pokemon.type[0].toLowerCase().indexOf(val.toLowerCase()) > -1);
        }

      })

    } else {
      this.PokemonPage = this.ListaPokemons.slice(0, 10);;

    }
  }


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  loadData(event) {
    if (this.desativar) {

      setTimeout(() => {
        let newPokemon = this.ListaPokemons.slice(this.index, this.offset + this.index);
        this.index += this.offset;

        for (let i = 0; i < newPokemon.length; i++) {
          this.PokemonPage.push(newPokemon[i]);
        }
        console.log('Done');
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll

        if (this.PokemonPage.length == this.ListaPokemons.length) {
          event.target.disabled = true;
        }
      }, 500);
    }
  }

  async filter() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter by type: ',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Normal',
          icon: 'radio-button-off-outline',
          handler: () => {
            this.filterType('normal');
          }
        }, {
          text: 'Fire',
          icon: 'flame',
          handler: () => {
            this.filterType('fire');
          }
        }, {
          text: 'Water',
          icon: 'water-outline',
          handler: () => {
            this.filterType('water');
          }
        }, {
          text: 'Grass',
          icon: 'leaf',
          handler: () => {
            this.filterType('grass');
          }
        }, {
          text: 'Bug',
          icon: 'bug',
          handler: () => {
            this.filterType('bug');
          }
        }, {
          text: 'Flying',
          icon: 'airplane',
          handler: () => {
            this.filterType('flying');
          }
        }, {
          text: 'Electric',
          icon: 'flash',
          handler: () => {
            this.filterType('electric');
          }
        }, {
          text: 'Ground',
          icon: 'stop',
          handler: () => {
            this.filterType('ground');
          }
        }, {
          text: 'Poison',
          icon: 'skull',
          handler: () => {
            this.filterType('poison');
          }
        }, {
          text: 'Fighting',
          icon: 'barbell',
          handler: () => {
            this.filterType('fighting');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.filterType('');
            this.desativar = true;
            document.getElementById('infinite').style.display = "block";
          }
        }]
    });
    await actionSheet.present();
  }

}