import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})

export class PokemonPage implements OnInit {
  poke: any;
  id: any;
  Listagem: Pokemon[];
  Pokemon: Pokemon;
  evolutions: any[] = [];
  evolutionZ: any;

  constructor(public route: ActivatedRoute, public PokemonService: PokemonService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id")
    })
  }

  async ngOnInit() {
    this.poke = await this.PokemonService.getJSON();
    this.Listagem = this.poke;
    this.Pokemon = await this.getPokemon(this.id)
    this.getEvolution();
    console.log(this.evolutionZ)
  }

  async getPokemon(id) {
    let Pokemon;
    this.Listagem.forEach(especifico => {
      if (especifico.id == id) {
        Pokemon = especifico;
        return Pokemon
      }
    })
    return Pokemon
  }

  async getEvolution() {
    this.Pokemon.next_evolution.forEach(elementy => {
      this.Listagem.forEach(element => {
        if (element.num == elementy.num) {
          this.evolutions.push(element);
          this.evolutionZ = this.evolutions
          return this.evolutionZ
        }
      });
    });
  }

}